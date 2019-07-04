import sys
import json

# add your libs

# takes argument data from python shell input
skUsers = sys.argv[1]

# add your logic

# returns json object back to python shell
print(json.dumps({"message": "verified", "users" : skUsers}))