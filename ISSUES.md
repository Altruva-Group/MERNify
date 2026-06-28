<!--   -->

<!-- # grafana        | logger=sqlstore t=2025-03-02T10:38:46.589285595+01:00 level=warn msg="SQLite database file has broader permissions than it should" path=/var/lib/grafana/grafana.db mode=-rwxrwxrwx expected=-rw-r-----  -->


<!-- 2025-03-13 11:04:33 mongo-config-02          | {"t":{"$date":"2025-03-13T10:04:33.463+00:00"},"s":"I",  "c":"STORAGE",  "id":22297,   "ctx":"initandlisten","msg":"Using the XFS filesystem is strongly recommended with the WiredTiger storage engine. See http://dochub.mongodb.org/core/prodnotes-filesystem","tags":["startupWarnings"]} -->

<!-- 2025-03-13 11:04:52 mongo-config-02          | {"t":{"$date":"2025-03-13T10:04:52.331+00:00"},"s":"W",  "c":"CONTROL",  "id":22120,   "ctx":"initandlisten","msg":"Access control is not enabled for the database. Read and write access to data and configuration is unrestricted","tags":["startupWarnings"]} -->

<!-- 2025-03-13 11:04:52 mongo-config-02          | {"t":{"$date":"2025-03-13T10:04:52.331+00:00"},"s":"W",  "c":"CONTROL",  "id":22178,   "ctx":"initandlisten","msg":"/sys/kernel/mm/transparent_hugepage/enabled is 'always'. We suggest setting it to 'never' in this binary version","tags":["startupWarnings"]} -->

<!-- =========================== -->

<!-- ROUTER 01 -->
<!-- {"$date":"2025-03-13T10:04:19.674+00:00"},"s":"I",  "c":"CONNPOOL", "id":22576,   "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"Connecting","attr":{"hostAndPort":"configsvr02:40002"}}
2025-03-13 11:04:21 router-01                | {"t":{"$date":"2025-03-13T10:04:20.494+00:00"},"s":"I",  "c":"-",        "id":4333222, "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"RSM received error response","attr":{"host":"configsvr01:40001","error":"HostUnreachable: Error connecting to configsvr01:40001 (172.26.0.20:40001) :: caused by :: Connection refused","replicaSet":"rs-config-server","response":{}}}
2025-03-13 11:04:22 router-01                | {"t":{"$date":"2025-03-13T10:04:20.494+00:00"},"s":"I",  "c":"NETWORK",  "id":4712102, "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"Host failed in replica set","attr":{"replicaSet":"rs-config-server","host":"configsvr01:40001","error":{"code":6,"codeName":"HostUnreachable","errmsg":"Error connecting to configsvr01:40001 (172.26.0.20:40001) :: caused by :: Connection refused"},"action":{"dropConnections":true,"requestImmediateCheck":true}}}
2025-03-13 11:04:22 router-01                | {"t":{"$date":"2025-03-13T10:04:22.664+00:00"},"s":"I",  "c":"-",        "id":4333218, "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"Rescheduling the next replica set monitoring request","attr":{"replicaSet":"rs-config-server","host":"configsvr01:40001","delayMillis":0}}
2025-03-13 11:04:22 router-01                | {"t":{"$date":"2025-03-13T10:04:22.665+00:00"},"s":"I",  "c":"CONNPOOL", "id":22576,   "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"Connecting","attr":{"hostAndPort":"configsvr01:40001"}}
2025-03-13 11:04:26 router-01                | {"t":{"$date":"2025-03-13T10:04:26.437+00:00"},"s":"W",  "c":"NETWORK",  "id":23019,   "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"DNS resolution while connecting to peer was slow","attr":{"peer":"configsvr02:40002","durationMillis":6763}}
2025-03-13 11:04:26 router-01                | {"t":{"$date":"2025-03-13T10:04:26.439+00:00"},"s":"I",  "c":"-",        "id":4333222, "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"RSM received error response","attr":{"host":"configsvr03:40003","error":"HostUnreachable: Error connecting to configsvr03:40003 :: caused by :: Could not find address for configsvr03:40003: SocketException: Host not found (authoritative)","replicaSet":"rs-config-server","response":{}}} -->


 <!-- ROUTER 02 -->
 <!-- 2025-03-13 11:04:43 router-02                | {"t":{"$date":"2025-03-13T10:04:43.896+00:00"},"s":"I",  "c":"CONNPOOL", "id":22576,   "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"Connecting","attr":{"hostAndPort":"configsvr02:40002"}}
2025-03-13 11:04:43 router-02                | {"t":{"$date":"2025-03-13T10:04:43.907+00:00"},"s":"I",  "c":"-",        "id":4333222, "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"RSM received error response","attr":{"host":"configsvr02:40002","error":"HostUnreachable: Error connecting to configsvr02:40002 (172.26.0.21:40002) :: caused by :: Connection refused","replicaSet":"rs-config-server","response":{}}}
2025-03-13 11:04:43 router-02                | {"t":{"$date":"2025-03-13T10:04:43.907+00:00"},"s":"I",  "c":"NETWORK",  "id":4712102, "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"Host failed in replica set","attr":{"replicaSet":"rs-config-server","host":"configsvr02:40002","error":{"code":6,"codeName":"HostUnreachable","errmsg":"Error connecting to configsvr02:40002 (172.26.0.21:40002) :: caused by :: Connection refused"},"action":{"dropConnections":true,"requestImmediateCheck":true}}}
2025-03-13 11:04:44 router-02                | {"t":{"$date":"2025-03-13T10:04:44.395+00:00"},"s":"I",  "c":"-",        "id":4333222, "ctx":"ReplicaSetMonitor-TaskExecutor","msg":"RSM received error response","attr":{"host":"configsvr01:40001","error":"HostUnreachable: Error connecting to configsvr01:40001 (172.26.0.20:40001) :: caused by :: Connection refused","replicaSet":"rs-config-server","response":{}}} -->


<!-- CONFIGSVR 01 -->
<!-- 2025-03-13 11:05:07 mongo-config-01          | {"t":{"$date":"2025-03-13T10:05:07.562+00:00"},"s":"I",  "c":"SHARDING", "id":22727,   "ctx":"ShardRegistryUpdater","msg":"Error running periodic reload of shard registry","attr":{"error":"ReadConcernMajorityNotAvailableYet: Read concern majority reads are currently not possible.","shardRegistryReloadIntervalSeconds":30}}
2025-03-13 11:05:11 mongo-config-01          | {"t":{"$date":"2025-03-13T10:05:11.173+00:00"},"s":"I",  "c":"-",        "id":4939300, "ctx":"monitoring-keys-for-HMAC","msg":"Failed to refresh key cache","attr":{"error":"ReadConcernMajorityNotAvailableYet: Read concern majority reads are currently not possible.", -->

<!-- CONFIGSVR 02 -->


<!-- CONFIGSVR 03 -->


<!-- SHARD 01  -->
<!-- PRI -->
<!-- SEC -->
<!-- 2025-03-13 11:03:57 shard-01-node-secondary  | {"t":{"$date":"2025-03-13T10:03:57.043+00:00"},"s":"W",  "c":"CONTROL",  "id":22120,   "ctx":"initandlisten","msg":"Access control is not enabled for the database. Read and write access to data and configuration is unrestricted","tags":["startupWarnings"]}
2025-03-13 11:03:57 shard-01-node-secondary  | {"t":{"$date":"2025-03-13T10:03:57.043+00:00"},"s":"W",  "c":"CONTROL",  "id":22178,   "ctx":"initandlisten","msg":"/sys/kernel/mm/transparent_hugepage/enabled is 'always'. We suggest setting it to 'never' in this binary version","tags":["startupWarnings"]}
2025-03-13 11:03:57 shard-01-node-secondary  | {"t":{"$date":"2025-03-13T10:03:57.043+00:00"},"s":"W",  "c":"CONTROL",  "id":5123300, "ctx":"initandlisten","msg":"vm.max_map_count is too low","attr":{"currentValue":262144,"recommendedMinimum":1677720,"maxConns":838860},"tags":["startupWarnings"]} -->
<!-- ARB -->

<!-- SHARD 02  -->
<!-- PRI -->
<!-- SEC -->
<!-- ARB -->

<!-- SHARD 03  -->
<!-- PRI -->
<!-- SEC -->
<!-- ARB -->