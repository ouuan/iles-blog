from braceexpand import braceexpand
from itertools import chain
from time import sleep
import frontmatter
import glob
import os
import random
import requests
import string
import subprocess


os.chdir("src/pages")
globs = braceexpand("{post/**/*,about}.{md,mdx}")
path_iter = chain.from_iterable(glob.iglob(g, recursive=True) for g in globs)

documents = []

for i, path in enumerate(path_iter):
    lastUpdatedResult = subprocess.run(
        ["git", "log", "-1", "--format=%aI", "--follow", "--", path],
        capture_output=True,
    )
    with open(path, "r") as f:
        post = frontmatter.load(f)
        meta = post.metadata
        noext = os.path.splitext(path)[0]
        doc = {
            "id": i,
            "href": f"/{noext.lower()}",
            "filename": f"src/pages/{path}",
            "basename": os.path.basename(noext),
            "title": meta["title"],
            "date": meta["date"].isoformat(),
            "lastUpdated": lastUpdatedResult.stdout.decode().strip(),
            "tags": meta.get("tags", []),
            "content": post.content,
        }
        documents.append(doc)


meili_url = os.environ["MEILI_URL"]
meili_admin_key = os.environ["MEILI_ADMIN_KEY"]


def meili(method, path, json):
    headers = {
        "Authorization": f"Bearer {meili_admin_key}",
    }
    if json is not None:
        headers["Content-Type"] = "application/json"
    return requests.request(
        method, f"{meili_url}{path}", headers=headers, json=json
    ).json()


def wait_meili(task, allow_failed=False):
    uid = task["taskUid"]
    while True:
        status = meili("GET", f"/tasks/{uid}", None).get("status")
        if status == "enqueued" or status == "processing":
            print(f"Waiting for Meili task {uid} [{status}] to finish...")
            sleep(1)
            continue
        if status == "succeeded" or allow_failed:
            print(f"Meili task {uid} {status}")
            return
        raise Exception(f"Meili task {uid} failed")


new_index = "blog-posts-new-" + "".join(random.choices(string.ascii_lowercase, k=10))

task = meili("POST", "/indexes", {"uid": new_index, "primaryKey": "id"})
wait_meili(task)

task = meili(
    "PATCH",
    f"/indexes/{new_index}/settings",
    {"searchableAttributes": ["title", "tags", "basename", "content"]},
)
wait_meili(task)

task = meili("POST", f"/indexes/{new_index}/documents", documents)
wait_meili(task)

task = meili("POST", "/indexes", {"uid": "blog-posts"})
wait_meili(task, True)

task = meili("POST", "/swap-indexes", [{"indexes": ["blog-posts", new_index]}])
wait_meili(task)

task = meili("DELETE", f"/indexes/{new_index}", None)
wait_meili(task)
