import sys
import json

skUsers = sys.argv[1]
print(json.dumps({"message": "verified", "users" : skUsers}))