# CyVerse Partnership HPC Resources: Jetstream-2 and TACC

CyVerse partnerships with Jetstream-2 and TACC provide researchers with access to **over 50 petaFLOPS of computing power**, spanning cloud-native infrastructure and traditional HPC systems. Jetstream-2 delivers 8 petaFLOPS through flexible virtual infrastructure with **96 NVIDIA H100 GPUs** available via the NAIRR AI Fellows Program, while TACC operates four major systems totaling over 800,000 CPU cores and 1,300+ GPUs. The TACC partnership includes a **6+ PB CyVerse data store mirror** updated nightly, enabling high-performance data access for life sciences workflows. Both partnerships support ACCESS-CI allocations, making these resources available to US-based researchers through standardized proposal mechanisms with varying scales from 400K to millions of service units annually.

## Jetstream-2 cloud infrastructure at Indiana University

### System architecture and total capacity

Jetstream-2 represents NSF's next-generation cloud computing infrastructure with **538 total nodes** delivering **8 petaFLOPS** of virtual supercomputing power. The system features five distinct node types optimized for different workloads: standard compute nodes (384), large memory nodes (32), A100 GPU nodes (90), H100 GPU nodes (24), and L40S GPU nodes (8). Total system resources include **360 NVIDIA A100 GPUs**, **96 NVIDIA H100 GPUs**, **32 NVIDIA L40S GPUs**, **14 PB Ceph storage**, and **100 Gbps networking** to Internet2. The primary cloud resides at IU Bloomington with regional deployments at Arizona State University, Cornell, University of Hawaii, and Texas Advanced Computing Center.

The system became operational in 2021 with a **$29.4 million total NSF investment** (Grant #2005506), including a $4.9 million supplement in 2024 to support the National AI Research Resource (NAIRR) Pilot. This positions Jetstream-2 as a critical component of national AI research infrastructure while maintaining its core mission of providing accessible cloud computing to researchers with limited HPC experience.

### Compute node specifications and configurations

| Node Type | Count | CPU Model | Cores/Node | Memory | GPUs | Local Storage | Network |
|-----------|-------|-----------|------------|--------|------|---------------|---------|
| **Standard Compute** | 384 | 2× AMD Milan 7713 | 128 | 512 GB | — | 240 GB SSD | 100 Gbps |
| **Large Memory** | 32 | 2× AMD Milan 7713 | 128 | 1 TB | — | 480 GB SSD | 100 Gbps |
| **A100 GPU** | 90 | 2× AMD Milan 7713 | 128 | 512 GB | 4× A100 40GB | 960 GB SSD | 100 Gbps |
| **H100 GPU (NAIRR)** | 24 | 2× Intel Xeon 8468 | 96 | 1 TB | 4× H100 80GB | 500 GB NVMe | 100 Gbps |
| **L40S GPU** | 8 | 2× Intel Xeon 6438M | 64 | 503 GB | 4× L40S 48GB | 500 GB NVMe | 100 Gbps |

**Aggregate system resources** total 67,584 CPU cores across all node types. The standard compute nodes provide the foundation with 49,152 cores, while GPU-enabled nodes contribute an additional 15,616 cores alongside specialized accelerators. All nodes run Ubuntu Linux and connect via 100 Gbps Ethernet in a modern leaf-spine Clos topology using BGP routing.

The **AMD Milan 7713 processors** powering most nodes feature 64 cores per socket running at 2.0 GHz base frequency. These chips provide excellent per-core performance with 32KB L1 cache, 512KB L2 cache, and 256MB L3 cache distributed across the die. The H100 nodes use newer **Intel Xeon Platinum 8468** processors with 48 cores per socket, while L40S nodes employ mid-range **Intel Xeon Gold 6438M** chips with 32 cores per socket.

### GPU resources and performance characteristics

Jetstream-2's GPU portfolio addresses three distinct use cases through carefully selected NVIDIA architectures. The **360 A100 SXM4 GPUs** provide workhorse AI training and HPC capabilities, while **96 H100 SXM5 GPUs** deliver cutting-edge performance for large language models and transformer-based AI. The **32 L40S GPUs** optimize for multi-modal AI workloads combining inference, training, and visualization.

#### NVIDIA A100 specifications (360 GPUs total)

| Specification | Value |
|---------------|-------|
| **Architecture** | NVIDIA Ampere (7nm) |
| **GPU Memory** | 40 GB HBM2 per GPU |
| **Memory Bandwidth** | 1,555 GB/s |
| **CUDA Cores** | 6,912 |
| **Tensor Cores** | 432 (3rd generation) |
| **FP64 Performance** | 9.7 TFLOPS per GPU / **3.5 PFLOPS total** |
| **FP32 Performance** | 19.5 TFLOPS per GPU |
| **TF32 Tensor** | 156 TFLOPS (312 with sparsity) |
| **FP16 Tensor** | 312 TFLOPS (624 with sparsity) |
| **INT8 Tensor** | 624 TOPS (1,248 with sparsity) |
| **NVLink** | 3rd gen, 600 GB/s per GPU |
| **Multi-Instance GPU** | Up to 7 instances @ 5GB each |

#### NVIDIA H100 specifications (96 GPUs total)

| Specification | Value |
|---------------|-------|
| **Architecture** | NVIDIA Hopper (4nm) |
| **GPU Memory** | 80 GB HBM3 per GPU |
| **Memory Bandwidth** | 3.35 TB/s (3,350 GB/s) |
| **CUDA Cores** | 16,896 |
| **Tensor Cores** | 528 (4th generation) |
| **FP64 Performance** | 34 TFLOPS per GPU / **3.3 PFLOPS total** |
| **FP32 Performance** | 67 TFLOPS per GPU |
| **TF32 Tensor** | 989 TFLOPS (1,979 with sparsity) |
| **FP16 Tensor** | 1,979 TFLOPS (3,958 with sparsity) |
| **FP8 Tensor** | 3,958 TFLOPS (7,916 with sparsity) |
| **INT8 Tensor** | 3,958 TOPS (7,916 with sparsity) |
| **NVLink** | 4th gen, 900 GB/s per GPU |
| **Multi-Instance GPU** | Up to 7 instances @ 10GB each |
| **Key Innovation** | Transformer Engine with FP8 precision |

The H100 delivers **30× faster inference** on large language models versus A100 and **4× faster training** for GPT-3 175B parameter models. The Transformer Engine automatically manages FP8 precision to maintain model accuracy while dramatically accelerating training and inference for transformer-based architectures.

#### NVIDIA L40S specifications (32 GPUs total)

| Specification | Value |
|---------------|-------|
| **Architecture** | NVIDIA Ada Lovelace (4nm) |
| **GPU Memory** | 48 GB GDDR6 per GPU |
| **Memory Bandwidth** | 864 GB/s |
| **CUDA Cores** | 18,176 |
| **Tensor Cores** | 568 (4th generation) |
| **RT Cores** | 142 (3rd generation) |
| **FP32 Performance** | 91.6 TFLOPS per GPU |
| **RT Core Performance** | 212 TFLOPS |
| **FP8 Tensor** | Supported for AI workloads |
| **Key Features** | Optimized for generative AI, LLM inference, real-time ray tracing |

The L40S provides **5× higher inference performance** versus previous generation and **2× real-time ray-tracing performance**, making it ideal for multi-modal AI combining vision, language, and graphics rendering.

### Virtual machine configurations and service units

Jetstream-2 provides three separate ACCESS resources requiring explicit requests for each type. Users select from standardized "flavors" with predetermined vCPU, memory, and GPU allocations. The service unit (SU) model charges **1 SU = 1 vCPU-hour** for standard compute, **2 SU/vCPU-hour** for large memory, and **2 SU/vCPU-hour** for GPU instances (reduced from 4 SU in July 2024, representing 50% cost reduction).

#### Standard compute instances (m3.* flavors)

| Flavor | vCPUs | RAM (GB) | Storage (GB) | SU/hour | Annual Cost (24/7) |
|--------|-------|----------|--------------|---------|---------------------|
| m3.tiny | 1 | 3 | 20 | 1 | 8,760 SU |
| m3.small | 2 | 6 | 20 | 2 | 17,520 SU |
| m3.quad | 4 | 15 | 20 | 4 | 35,040 SU |
| m3.medium | 8 | 30 | 60 | 8 | 70,080 SU |
| m3.large | 16 | 60 | 60 | 16 | 140,160 SU |
| m3.xl | 32 | 125 | 60 | 32 | 280,320 SU |
| m3.2xl | 64 | 250 | 60 | 64 | 560,640 SU |
| m3.3xl* | 128 | 500 | 60 | 128 | 1,121,280 SU |

*Available by request with justification

#### Large memory instances (r3.* flavors)

| Flavor | vCPUs | RAM (GB) | Storage (GB) | SU/hour | Annual Cost (24/7) |
|--------|-------|----------|--------------|---------|---------------------|
| r3.large* | 64 | 500 | 60 | 128 | 1,121,280 SU |
| r3.xl* | 128 | 1,000 | 60 | 256 | 2,242,560 SU |

*Available by request with justification

Large memory instances provide **double the RAM** of equivalent CPU instances at 2× charge rate.

#### GPU instances - Partial GPU with vGPU (g3.* A100)

| Flavor | vCPUs | RAM (GB) | GPU Compute | GPU RAM (GB) | SU/hour |
|--------|-------|----------|-------------|--------------|---------|
| g3.small* | 4 | 15 | 12.5% A100 | 5 | 8 |
| g3.medium | 8 | 30 | 25% A100 | 10 | 16 |
| g3.large | 16 | 60 | 50% A100 | 20 | 32 |

*g3.small being retired August 2025

#### GPU instances - Full GPU with PCI passthrough

| Flavor | vCPUs | RAM (GB) | GPU Configuration | GPU RAM (GB) | SU/hour | Annual Cost (24/7) |
|--------|-------|----------|-------------------|--------------|---------|---------------------|
| **A100 series** |||||
| g3.xl* | 32 | 125 | 1× A100 | 40 | 64 | 560,640 SU |
| g3.2xl* | 64 | 250 | 2× A100 | 80 | 128 | 1,121,280 SU |
| g3.4xl* | 128 | 500 | 4× A100 | 160 | 256 | 2,242,560 SU |
| **L40S series** |||||
| g4.xl* | 32 | 125 | 1× L40S | 48 | 64 | 560,640 SU |
| g4.2xl* | 64 | 250 | 2× L40S | 96 | 128 | 1,121,280 SU |
| g4.4xl* | 128 | 500 | 4× L40S | 192 | 256 | 2,242,560 SU |
| **H100 series (NAIRR)** |||||
| g5.xl* | 24 | 252 | 1× H100 | 80 | 48 | 420,480 SU |
| g5.2xl* | 48 | 503 | 2× H100 | 160 | 96 | 840,960 SU |
| g5.4xl* | 96 | 1,007 | 4× H100 | 320 | 192 | 1,681,920 SU |

*Available by request with justification to help@jetstream-cloud.org

**Instance state charging:** SUSPENDED instances charged at 75% of normal rate, STOPPED instances at 50%, and SHELVED instances incur NO charges (recommended for conservation).

### NAIRR H100 GPU supplement program details

The **Jetstream2 NAIRR AI Fellows Program** runs January through September 2026 as part of the National Artificial Intelligence Research Resource Pilot initiative. This competitive program provides priority access to Jetstream-2's **96 H100 GPUs**, **32 L40S GPUs**, and **360 A100 GPUs** alongside specialized training, technical consulting, and a **$5,000 completion stipend**.

#### Eligibility and application requirements

**Eligible applicants** include US-based researchers and educators from US institutions working in the US. Graduate students may apply with a letter of collaboration from their advisor. All applicants must affirm NAIRR-pilot PI eligibility and plan to work in the US during the fellowship period (January-October 2026).

**Application deadline: October 10, 2025** (best apply date: October 1, 2025). Awards announced by November 10, 2025.

**Required materials** submitted as single PDF:
- NAIRR-pilot PI eligibility affirmation statement
- CV or NSF Biosketch (maximum 3 pages)
- Project description (maximum 3 pages, 11-point font minimum):
  - Scientific goals and AI technique applications
  - Technical implementation description
  - Timeline for 9-month program
  - Compute and storage needs estimate
  - Community contribution description
- Letter of collaboration from advisor (graduate students only)

#### Program components and deliverables

Fellows receive **technical project consulting** to overcome AI research challenges on Jetstream2, including onboarding assistance and guidance leveraging advanced GPU capabilities. **Specialized training** covers the Jetstream2 AI Workbench and techniques to augment AI methodologies.

**Community contribution requirements** include:
- Deliver 1-2 hour AI-related tutorial or module (webinar or in-person format)
- Produce report or formal case study describing AI research implementation
- Provide individual contribution for IU news article
- Present final results (~10 minutes) to Jetstream2 team

#### Program timeline and compensation

**January 5-9, 2026:** In-person kickoff meeting in Tucson, Arizona with travel expenses fully covered (airfare, lodging, meals)

**Throughout 2026:** Access to events, training sessions, and one-on-one consultations

**May 30, 2026:** Mid-program progress report due

**September 30, 2026:** Wrap-up event with final presentations

**Compensation:** Travel expenses for kickoff meeting plus **$5,000 stipend** upon successful program completion

Contact: help@jetstream-cloud.org

### Storage architecture and data management

Jetstream-2 provides **14 PB total capacity** using Ceph distributed storage with three access patterns optimized for different use cases. The Ceph RADOS (Reliable Autonomic Distributed Object Store) foundation provides replicated object storage with checksums for data integrity, copy-on-write semantics, and online corruption detection/correction.

#### Volumes (block storage)

Simple block devices attachable to single instance at a time. Ideal for dedicated storage, databases, and custom boot disks. Volumes are resizable and snapshot-capable, providing flexible capacity management without downtime.

#### Manila shares (network file system)

Shared-Filesystems-as-a-Service mountable to many instances simultaneously. Supports cross-allocation mounting with configurable access control (read-only/read-write). Resizable after creation. Uses Ceph with native kernel client or FUSE client (requires ceph-commons and ceph-fuse packages).

#### Object store (S3-compatible)

Amazon S3-compatible cloud storage buckets accessible via HTTP from anywhere without Jetstream2 network connection required. Dynamic sizing with no preset allocation, scalable to petabyte-scale. Higher latency than volumes/Manila shares. Not POSIX-compliant (requires s3fs for traditional filesystem mounting).

**Network infrastructure** employs Border Gateway Protocol (BGP) routing with modern Clos leaf-spine topology. Each node connects at 100 Gbps to switches, with redundant dual-attachment for GPU hosts, control plane, and storage cluster. The system connects to Internet2 via 4× 100 Gbps links providing aggregate 400 Gbps external bandwidth. Software-defined networking (Neutron overlay) enables virtual networks, private subnets, floating IPs, security groups, and cross-cloud VPN connectivity.

### ACCESS allocation mechanisms and resource access

Access to Jetstream-2 requires valid **ACCESS (Advanced Cyberinfrastructure Coordination Ecosystem: Services & Support) allocation** with US-based Principal Investigator. Free ACCESS accounts available at https://identity.access-ci.org/ with activation taking up to 4 hours after PI adds users.

**Critical requirement:** Having access to one Jetstream2 resource type does NOT grant access to others. Users must explicitly request Jetstream2 (CPU), Jetstream2 GPU, and/or Jetstream2 Large Memory separately in allocation proposals.

#### ACCESS allocation tiers

| Tier | Credits | Duration | Requirements | Best For |
|------|---------|----------|--------------|----------|
| **Explore** | Up to 400,000 | 12 months | Abstract only | Trying resources, small classroom activities |
| **Discover** | Up to 1,500,000 | 12 months | Abstract + 1-page | Small research, Campus Champions |
| **Accelerate** | Up to 3,000,000 | 12 months | Abstract + 3-page + review | Mid-scale needs, multi-grant programs |
| **Maximize** | Large-scale | 12 months | 10-page + performance docs | Large research similar to XSEDE |

**Service unit equivalency:** 1 ACCESS Credit = 1 Jetstream2 Service Unit (SU), simplifying resource planning.

**Special resource requests** for large memory instances, multi-GPU instances, and H100/L40S instances require justification submitted to help@jetstream-cloud.org. Decisions based on justification quality and resource availability.

### User interfaces and management tools

Jetstream2 provides five interfaces with unified namespace (single pane of glass):

**Exosphere** (recommended GUI) - Primary user-friendly web interface with point-and-click operations, integrated web-based shell and desktop access via Apache Guacamole. Suitable for users with limited cloud experience.

**CACAO** (CyVerse collaboration) - Containerized Atmosphere for Continuous Analysis Orchestration built by CyVerse. Enables cloud-native deployments using Terraform/Ansible with pre-defined templates: Virtual SLURM clusters (Magic Castle), JupyterHub, Kubernetes, Ray Cluster (AI/ML pipelines), and Kubeflow Cluster. Project-based resource organization suitable for complex multi-server deployments.

**OpenStack Horizon** - Standard OpenStack web dashboard with full API access to all services. Advanced features and configurations for experienced cloud users.

**OpenStack CLI** - Robust command-line tools for automation, scriptable infrastructure management, Python-based OpenStack client for DevOps and infrastructure-as-code.

**Third-party tools** - Any OpenStack-compatible tool, language bindings (Python, Go), infrastructure orchestration (Terraform, Ansible).

### Documentation and support resources

**Primary documentation:**
- Main docs: https://docs.jetstream-cloud.org/
- System configuration: https://docs.jetstream-cloud.org/overview/config/
- Instance flavors: https://docs.jetstream-cloud.org/general/instance-flavors/
- GPU FAQ: https://docs.jetstream-cloud.org/faq/gpu/
- Storage overview: https://docs.jetstream-cloud.org/general/storage/

**Support channels:**
- Email: help@jetstream-cloud.org
- Office hours: Every Tuesday, 2-3 PM Eastern Time
- Operations dashboard: https://operations.access-ci.org/node/576

**NAIRR resources:**
- NAIRR Pilot Portal: https://nairrpilot.org
- Allocations: https://nairrpilot.org/opportunities/allocations

**CyVerse resources:**
- Cloud Native Camp: https://cc.cyverse.org/cloud/js2/
- Learning materials: https://learning.cyverse.org/

## TACC systems overview and ACCESS integration

### TACC resource portfolio and capabilities

The Texas Advanced Computing Center operates four major HPC systems providing over **55 petaFLOPS** of computing power through ACCESS-CI and institutional partnerships. **Frontera** (38.75 peak PFLOPS) serves as the largest academic supercomputer in the US with 468,608 cores. **Stampede3** (~10 peak PFLOPS) delivers the newest NSF strategic resource with high-bandwidth memory CPUs and 96 H100 GPUs. **Lonestar6** (3 peak PFLOPS) serves Texas researchers with 252 A100 and 8 H100 GPUs. **Vista** (4.1 CPU + 40.8 GPU PFLOPS) pioneered TACC's first ARM-based deployment with 600 NVIDIA H200 GPUs using Grace Hopper architecture.

These systems share the **Stockyard global filesystem** enabling seamless cross-system workflows, with unified $WORK directories providing 1TB per-user quotas accessible from all major TACC systems. The **Ranch tape archive** provides exabyte-scale long-term storage. The **CyVerse partnership** maintains a **6+ PB data store mirror** at TACC with nightly replication, supporting life sciences research data management and high-performance bioinformatics workflows.

### Frontera: Largest academic supercomputer in the US

Frontera became NSF's flagship leadership-class computing system in September 2019 with **$60 million NSF funding** (Award #1818253). The system delivers **38.75 peak petaflops** through 8,368 Intel Cascade Lake compute nodes totaling **468,608 CPU cores**. Additional specialized resources include 16 large memory nodes with 2.1 TB NVDIMM and 90 GPU nodes with 360 NVIDIA Quadro RTX 5000 GPUs.

#### Frontera compute node specifications

| Component | Specification |
|-----------|--------------|
| **Node count** | 8,368 compute nodes |
| **CPU** | Intel Xeon Platinum 8280 "Cascade Lake" |
| **Cores per node** | 56 cores (2 sockets × 28 cores) |
| **Total system cores** | 468,608 cores |
| **Clock rate** | 2.7 GHz nominal |
| **Memory per node** | 192 GB DDR4 (2933 MT/s) |
| **Cache** | 32KB L1/core, 1MB L2/core, 38.5MB L3/socket |
| **Node performance** | ~2.8 TFLOPS peak per node |
| **Local storage** | 144 GB /tmp on 240GB SSD |

#### Frontera large memory and GPU resources

**Large memory nodes (16 nodes)** feature 4-socket Intel Xeon Platinum 8280M processors with **112 cores and 2.1 TB NVDIMM** plus 384GB DDR4 L4 cache. The NVDIMM provides persistent memory with 3.2TB usable capacity plus 144GB /tmp. Access via nvdimm queue at 2× charge rate.

**GPU nodes (90 nodes)** deploy **4× NVIDIA Quadro RTX 5000** per node totaling **360 GPUs system-wide**. Each RTX 5000 provides 3,072 CUDA cores, 384 Tensor cores, and 16GB GDDR6 memory. Paired with 2× Intel Xeon E5-2620 v4 "Broadwell" CPUs and 128GB DDR4 system memory. Access via rtx and rtx-dev queues at 3× charge rate.

#### Frontera storage and networking infrastructure

**Storage architecture** provides **~60 PB Lustre-based capacity** distributed across:
- **$HOME:** 25GB quota, 200K files, backed up, 1 stripe default
- **$WORK:** 1TB quota (Stockyard), 3M files shared across all TACC systems
- **$SCRATCH:** 44 PB total, no quota, three filesystems:
  - scratch1: 10.6 PB, 16 OSTs, 60 GB/s bandwidth
  - scratch2: 10.6 PB, 16 OSTs, 60 GB/s bandwidth
  - scratch3: 21.2 PB, 32 OSTs, 120 GB/s bandwidth
- **Purge policy:** Files not accessed in 10 days subject to purge

**Interconnect** uses **Mellanox HDR InfiniBand** with HDR-100 (100 Gb/s) connectivity to each node and HDR (200 Gb/s) between switches. Fat tree topology with 11:9 oversubscription ratio connecting through 6 core switches provides high-bandwidth, low-latency communication.

**ACCESS-CI access:** Available through NSF ACCESS allocations with over 55 million node-hours/year (80% capacity). Charge rate: **1 SU per node-hour** (normal queue). Documentation: https://docs.tacc.utexas.edu/hpc/frontera/

### Stampede3: Newest NSF strategic resource with diverse architectures

Stampede3 entered full production in May 2024 with **$10 million NSF funding** (Award #2320757) serving as TACC's high-capability system through 2029. The system provides **~10 peak petaflops** across **2,044 compute nodes** with four distinct CPU architectures plus H100 and Intel Ponte Vecchio GPU options.

#### Stampede3 node specifications by architecture

| Architecture | Nodes | CPU | Cores/Node | Total Cores | Memory | Peak PFLOPS | Features |
|-------------|-------|-----|------------|-------------|--------|-------------|----------|
| **Sapphire Rapids HBM** | 560 | Intel Xeon MAX 9480 | 112 | 62,720 | 128 GB HBM2e | ~4.0 | High bandwidth memory |
| **Ice Lake** | 224 | Intel Xeon Platinum 8380 | 80 | 17,920 | 256 GB DDR4 | ~1.5 | Balanced compute |
| **Skylake (legacy)** | 1,060 | Intel Xeon Platinum 8160 | 48 | 50,880 | 192 GB DDR4 | ~2.1 | Stampede2 carryover |
| **Ice Lake LM** | 3 | Intel Xeon Platinum 8380 | 80 | 240 | 4 TB NVDIMM | — | Large memory jobs |

The **Sapphire Rapids HBM nodes** represent the flagship resource with Intel Xeon CPU MAX 9480 processors featuring **128 GB HBM2e (high bandwidth memory)** directly attached to the CPU die. This delivers **8× higher memory bandwidth** versus DDR4, critical for memory-bound scientific applications. The 560 nodes provide 62,720 cores running at 1.9 GHz with 48KB L1, 1MB L2, and 112.5MB L3 cache per socket.

**Ice Lake nodes** provide 224 nodes with Intel Xeon Platinum 8380 processors (80 cores at 2.3 GHz nominal, 3.4 GHz max). These balanced compute nodes feature 256 GB DDR4 memory at 3.2 GHz with larger L3 cache (60MB per socket) optimized for diverse workloads.

**Skylake nodes** (1,060 legacy from Stampede2) continue service with Intel Xeon Platinum 8160 processors providing 48 cores at 2.1 GHz with 192 GB DDR4 memory. While older architecture, these nodes contribute substantial capacity for throughput computing.

#### Stampede3 GPU resources and specifications

| GPU Type | Nodes | GPUs/Node | Total GPUs | GPU Memory | Performance | Queue | Charge Rate |
|----------|-------|-----------|------------|------------|-------------|-------|-------------|
| **NVIDIA H100 SXM5** | 24 | 4 | 96 | 96 GB | 34 TFLOPS FP64 | h100 | 4× |
| **Intel PVC Max 1550** | 20 | 4 | 80 | 124 GB | ~20 TFLOPS FP64 | pvc | 3× |

**H100 nodes** feature 4× NVIDIA H100 SXM5 GPUs paired with Intel Xeon Platinum 8468 (Sapphire Rapids) 96-core CPUs and 1 TB DDR5 memory. Each H100 provides 96 GB HBM3 memory, 34 TFLOPS FP64, and 1,979 TFLOPS FP16 Tensor performance. Mellanox InfiniBand NDR (200 Gb/s split) connectivity. Total system: **96 H100 GPUs**.

**Intel Ponte Vecchio nodes** deploy 4× Intel Data Center GPU Max 1550 (2 tiles per GPU, 62GB per tile = 124GB per GPU) with Intel Xeon Platinum 8480 96-core CPUs and 1 TB DDR5 memory. Total system: **80 Intel PVC GPUs** optimized for HPC workloads with excellent FP64 performance.

#### Stampede3 storage and interconnect

**Storage infrastructure** features **10 PB all-flash VAST Data** filesystem providing exceptional performance:
- **$HOME:** 15GB quota, 300K files, backed up
- **$WORK:** 1TB quota (Stockyard Lustre shared across TACC)
- **$SCRATCH:** ~10 PB VAST, no quota, 10-day purge, 50GB/s write, 500GB/s read

**Interconnect** uses **Omni-Path 100 Gb/s** currently, upgrading to **Cornelis Networks CN5000 400 Gb/s**. Fat tree topology with 28/20 oversubscription for SKX nodes, fully connected for SPR/PVC nodes. Backbone bandwidth: 24 TB/s.

**ACCESS-CI access:** Available through NSF ACCESS with resource ID stampede3.tacc.access-ci.org. **Charge rates:** 1 SU (SKX), 1.5 SU (ICX), 2 SU (SPR), 3 SU (PVC), 4 SU (H100). Documentation: https://docs.tacc.utexas.edu/hpc/stampede3/

### Lonestar6: Texas researcher focused system with AMD architecture

Lonestar6 entered production in January 2022 serving Texas researchers from UT System, Texas A&M, Texas Tech, and University of North Texas. The system provides **3 peak petaflops** through **560 AMD EPYC Milan compute nodes** plus **88 GPU nodes** (84 A100, 4 H100) delivering focused capacity for state institutions.

#### Lonestar6 compute and GPU specifications

| Component | CPU Nodes | A100 GPU Nodes | H100 GPU Nodes |
|-----------|-----------|----------------|----------------|
| **Node count** | 560 | 84 | 4 |
| **CPU** | 2× AMD EPYC 7763 | 2× AMD EPYC 7763 | 2× AMD EPYC 9454 |
| **Cores/node** | 128 (2×64) | 128 (2×64) | 96 (2×48) |
| **Total cores** | 71,680 | 10,752 | 384 |
| **CPU clock** | 2.45 GHz (3.5 boost) | 2.45 GHz (3.5 boost) | 2.75 GHz (3.8 boost) |
| **Memory** | 256 GB DDR4 | 256 GB DDR4 | 384 GB DDR4 |
| **GPUs** | — | 3× A100 PCIe 40GB | 2× H100 PCIe 80GB |
| **Total GPUs** | — | 252 A100 | 8 H100 |
| **Node performance** | ~5 TFLOPS | ~5 CPU + 29 GPU TFLOPS | ~6 CPU + 52 GPU TFLOPS |
| **Local storage** | 288GB SSD | 288GB SSD | SSD |
| **Charge rate** | 1 SU | 4 SU (gpu-a100) | 6 SU (gpu-h100) |

The **AMD EPYC 7763 "Milan" processors** provide excellent per-core performance with 64 cores per socket running at 2.45 GHz base. Cache hierarchy includes 32KB L1/core, 512KB L2/core, and 32MB L3 per core complex. Total system: **71,680 CPU cores** plus **252 A100 GPUs** and **8 H100 GPUs**.

**Hybrid cooling** employs GRC liquid immersion technology for compute nodes combined with air cooling for GPU nodes, reducing energy consumption while maintaining performance.

#### Lonestar6 storage and networking

**Storage** provides **8 PB BeeGFS** parallel filesystem:
- **$HOME:** 10GB quota, 200K files, NFS, backed up, 7TB capacity
- **$WORK:** 1TB quota (Stockyard Lustre shared across TACC)
- **$SCRATCH:** 8 PB BeeGFS, no quota, 10-day purge, 96 targets, 4 targets default, 512KB chunk size

**Interconnect** uses **Mellanox HDR InfiniBand** with full HDR (200 Gb/s) connectivity in fat tree topology through 16 core switches with 24/16 oversubscription ratio.

**Allocation access** through **TACC Resource Allocation System (TxRAS)** for Texas researchers with startup, educational, and research allocation types. Documentation: https://docs.tacc.utexas.edu/hpc/lonestar6/

### Vista: ARM-based AI supercomputer with Grace Hopper

Vista entered full production in September 2024 as NSF supplement to Frontera (Award #1818253), representing TACC's first major ARM deployment and departure from x86 architecture. The system delivers **4.1 CPU petaflops + 40.8 GPU petaflops** through NVIDIA Grace Hopper and Grace-Grace architectures, serving as bridge between Frontera and the planned Horizon system (2026).

#### Vista architecture and node specifications

| Component | Grace-Grace (GG) CPU | Grace-Hopper (GH) GPU |
|-----------|---------------------|---------------------|
| **Node count** | 256 | 600 |
| **CPU architecture** | NVIDIA Grace Superchip | NVIDIA Grace CPU |
| **CPU cores/node** | 144 (2×72) | 72 |
| **Total system cores** | 36,864 | 43,200 |
| **ARM ISA** | ARM Neoverse V2 (SVE2) | ARM Neoverse V2 (SVE2) |
| **CPU clock** | 3.4 GHz | 3.1 GHz |
| **CPU performance** | >7 TFLOPS FP64/node | ~3.5 TFLOPS FP64/node |
| **Memory** | 237 GB LPDDR5 | 116 GB LPDDR5 |
| **Memory bandwidth** | >850 GiB/s (up to 1 TiB/s) | >400 GiB/s |
| **Cache** | 64KB L1, 1MB L2, 114MB L3/socket | 64KB L1, 1MB L2, 114MB L3 |
| **GPUs** | — | 1× NVIDIA H200 |
| **GPU memory** | — | 96 GB HBM3 |
| **GPU performance** | — | 34 TFLOPS FP64, 1,979 TFLOPS FP16 |
| **CPU-GPU connection** | — | NVLink (no PCIe bottleneck) |
| **Interconnect** | NDR200 (200 Gb/s) | NDR (400 Gb/s) |
| **Local storage** | 286GB /tmp | 286GB /tmp |
| **Charge rate** | 0.33 SU (gg queue) | 1 SU (gh queue) |

**Total GPU resources:** 600 NVIDIA H200 GPUs with 96 GB HBM3 memory each, providing **20.4 PFLOPS FP64** and **1.2 exaFLOPS FP16** tensor performance system-wide.

The Grace Hopper **unified memory architecture** places CPU and GPU memory in separate NUMA nodes connected via NVLink, eliminating PCIe bottlenecks. This enables **900 GB/s bidirectional bandwidth** between Grace CPU and H200 GPU, dramatically accelerating data movement for AI/ML workloads.

#### Vista storage and networking infrastructure

**Storage** uses **~10 PB VAST flash filesystems**:
- **$HOME:** 23GB quota, 500K files, backed up
- **$WORK:** 1TB quota (Stockyard Lustre shared)
- **$SCRATCH:** ~10 PB VAST flash, no quota, 10-day purge
- **Note:** VAST filesystems do NOT support Lustre striping commands

**Interconnect** employs **NVIDIA Quantum-2 NDR InfiniBand** with two-level fat tree (separate GG/GH trees). GH nodes connect at 400 Gb/s, GG nodes at 200 Gb/s. 16 core switches with dual-400G cables provide backbone.

**ACCESS-CI access** primarily through Frontera project allocations and NAIRR pilot. Documentation: https://docs.tacc.utexas.edu/hpc/vista/

### CyVerse data store partnership and TACC mirror

The CyVerse-TACC partnership maintains **over 6 PB of life sciences research data** mirrored between University of Arizona (primary) and TACC (mirror) with **nightly replication** for disaster recovery and geographic redundancy. The data store uses **iRODS (Integrated Rule-Oriented Data System)** managing the "iplant" zone with CyVerseRes (U. Arizona) as primary resource and taccRes (TACC) as mirror resource.

#### Data access mechanisms and integration

**Discovery Environment** provides web-based interface for data management and analysis workflows. **iCommands** offer command-line tools for high-performance transfers. **WebDAV** enables HTTP-based file access. **CyberDuck** provides GUI client support. **Data Commons** serves public datasets.

**TACC HPC integration** enables direct access from Stampede3, Frontera, and Lonestar6, supporting high-speed transfers to/from TACC computing resources. Connection bandwidth optimized for large-scale bioinformatics workflows processing terabytes of sequencing data.

**Storage cost:** $250/TB/year for additional double-copy storage beyond base allocation.

**Use cases** encompass life sciences research data management, bioinformatics workflows, high-throughput sequencing data, phenotypic and environmental datasets, and cloud services/APIs.

**Documentation:**
- CyVerse main: https://cyverse.org/
- Data Store: https://cyverse.org/data-store
- System overview: https://docs.cyverse.org/services/system_overview/
- TACC partnership: https://tacc.utexas.edu/research/tacc-research/cyverse/

### ACCESS-CI allocation system and process

ACCESS (Advanced Cyberinfrastructure Coordination Ecosystem: Services & Support) succeeded XSEDE as NSF's integrated advanced cyberinfrastructure coordination program. ACCESS provides standardized allocation mechanisms across TACC resources (Frontera, Stampede3, Ranch) with four tiers scaled to project needs.

#### ACCESS allocation tiers and requirements

| Tier | Credits | Duration | Review Process | Requirements | Purpose |
|------|---------|----------|----------------|--------------|---------|
| **EXPLORE** | Up to 400K | 12 months | Automated (1-2 days) | Minimal documentation | Getting started, testing, small projects |
| **DISCOVER** | Up to 1.5M | 12 months | Light review | Brief description | Small-scale research |
| **ACCELERATE** | Up to 5M | 12 months | Panel review | 3-page description | Well-defined research plans |
| **MAXIMIZE** | >5M | 12 months | Comprehensive panel | Extensive docs + scaling | Largest-scale computational needs |

**MAXIMIZE deadlines:** Semi-annual cycles with Dec 15-Jan 31 submission (awards Apr 1) and Jun 15-Jul 31 submission (awards Oct 1).

**ACCESS Credits** convert to resource-specific allocations with approximately 1 Credit = 1 core-hour or 1 GB storage (varies by resource). Exchange calculator available at: https://allocations.access-ci.org/exchange_calculator

**TACC resources in ACCESS:** Frontera (Dell/Intel Cascade Lake), Stampede3 (multi-architecture), Ranch (tape archive). Vista allocations primarily through Frontera project extensions.

#### Texas-specific allocations via TxRAS

**TACC Resource Allocation System (TxRAS)** serves Texas researchers from UT System, Texas A&M, Texas Tech, and UNT. Portal: https://submit-tacc.xras.org/

**Allocation types:** Startup (testing/development), Educational (classroom), Research (production science)

**Review cycles:** Four quarterly periods with different submission deadlines

**Eligible systems:** Primarily Lonestar6, with potential access to other TACC systems

### Stockyard global filesystem and supporting infrastructure

**Stockyard** provides unified Lustre parallel filesystem mounted as **$WORK on all major TACC systems** (Frontera, Stampede3, Lonestar6, Vista). Each user receives **1TB quota and 3M files** accessible across systems, enabling seamless cross-system workflows without data movement.

**Ranch tape archive** delivers exabyte-scale long-term archival storage using Quantum StorNext, DDN disk cache (30PB front-end), and Quantum Scalar i6000 tape libraries. Default allocation: 2TB per active account. New hardware deployment planned for 2025.

**Corral data storage** provides high-performance storage and data management for large-scale collections. Free for UT researchers, low annual fee for non-UT. Project-based allocations with capacity scaled to requirements.

## System comparison and performance summary

### Computational resources across all systems

| System | Organization | Nodes | Total Cores | CPU Peak PFLOPS | GPUs | GPU Type | GPU Peak PFLOPS | Total Peak PFLOPS | Interconnect | Charge Rate |
|--------|--------------|-------|-------------|-----------------|------|----------|-----------------|-------------------|--------------|-------------|
| **Jetstream-2** | IU | 538 | 67,584 | ~8.0 | 488 | 360× A100, 96× H100, 32× L40S | Variable by flavor | 8 | 100 Gbps Ethernet | 1-2 SU/vCPU |
| **Frontera** | TACC | 8,474 | 468,608 | 38.75 | 360 | RTX 5000 | ~2.0 | 40.75 | HDR-100 IB | 1 SU/node |
| **Stampede3** | TACC | 2,044 | ~200,000 | ~10.0 | 176 | 96× H100, 80× PVC | ~3.5 | 13.5 | OPA/CN 100-400G | 1-4 SU/node |
| **Lonestar6** | TACC | 648 | 82,816 | 3.0 | 260 | 252× A100, 8× H100 | ~2.7 | 5.7 | HDR 200G IB | 1-6 SU/node |
| **Vista** | TACC | 856 | 80,064 | 4.1 | 600 | H200 | 40.8 | 44.9 | NDR 200-400G IB | 0.33-1 SU/node |
| **TOTAL** | — | 12,560 | ~899,072 | ~63.85 | 1,884 | — | ~49.0 | ~112.85 | — | — |

### GPU performance characteristics by system

| System | GPU Model | Count | FP64/GPU | FP16 Tensor/GPU | Memory/GPU | Total FP64 PFLOPS | Total FP16 Tensor PFLOPS |
|--------|-----------|-------|----------|-----------------|------------|-------------------|--------------------------|
| **Jetstream-2 A100** | NVIDIA A100 SXM4 | 360 | 9.7 TF | 312 TF | 40 GB | 3.5 | 112.3 |
| **Jetstream-2 H100** | NVIDIA H100 SXM5 | 96 | 34 TF | 1,979 TF | 80 GB | 3.3 | 190.0 |
| **Jetstream-2 L40S** | NVIDIA L40S | 32 | ~20 TF* | ~180 TF* | 48 GB | 0.6 | 5.8 |
| **Frontera** | Quadro RTX 5000 | 360 | 5.6 TF | 89.2 TF | 16 GB | 2.0 | 32.1 |
| **Stampede3 H100** | NVIDIA H100 SXM5 | 96 | 34 TF | 1,979 TF | 96 GB | 3.3 | 190.0 |
| **Stampede3 PVC** | Intel Max 1550 | 80 | ~20 TF | ~80 TF | 124 GB | 1.6 | 6.4 |
| **Lonestar6 A100** | NVIDIA A100 PCIe | 252 | 9.7 TF | 312 TF | 40 GB | 2.4 | 78.6 |
| **Lonestar6 H100** | NVIDIA H100 PCIe | 8 | 26 TF | 1,513 TF | 80 GB | 0.2 | 12.1 |
| **Vista** | NVIDIA H200 | 600 | 34 TF | 1,979 TF | 96 GB | 20.4 | 1,187.4 |

*L40S primarily optimized for FP32 (91.6 TFLOPS) and multi-modal AI workloads

### Storage capacity and architecture summary

| System | $HOME | $WORK (Stockyard) | $SCRATCH | Technology | Backup | Purge Policy |
|--------|-------|-------------------|----------|------------|--------|--------------|
| **Jetstream-2** | — | — | 14 PB | Ceph distributed (block/NFS/S3) | User managed | No purge |
| **Frontera** | 25 GB | 1 TB | 44 PB | Lustre parallel | Yes | 10 days |
| **Stampede3** | 15 GB | 1 TB | 10 PB | VAST flash | Yes | 10 days |
| **Lonestar6** | 10 GB | 1 TB | 8 PB | BeeGFS parallel | Yes | 10 days |
| **Vista** | 23 GB | 1 TB | 10 PB | VAST flash | Yes | 10 days |
| **CyVerse Mirror** | — | — | 6+ PB | iRODS (mirrored) | Yes | No purge |

**Combined capacity:** Over 92 PB usable storage across all systems plus exabyte-scale Ranch tape archive.

### ACCESS allocation requirements and scaling

Research projects scale across allocation tiers based on computational needs:

**Small-scale testing** (400K credits / Explore) provides ~400,000 CPU-hours on Frontera (456 full nodes for 1 year at 20% utilization) or ~6,250 H100 GPU-hours on Stampede3/Vista.

**Medium research** (1.5M credits / Discover) supports ~1.5M CPU-hours (1,700 Frontera nodes at 20% utilization) or ~23,400 H100 GPU-hours.

**Large projects** (5M credits / Accelerate) enable ~5M CPU-hours (5,700 Frontera nodes at 20% utilization) or ~78,000 H100 GPU-hours sufficient for substantial AI model training.

**Leadership computing** (>5M credits / Maximize) provides millions to tens of millions of CPU-hours supporting multi-year campaigns on largest-scale simulations and AI training runs.

### Key architectural innovations and distinctions

**Jetstream-2** pioneered cloud-native HPC with OpenStack virtualization, flexible VM configurations, and on-demand GPU slicing via vGPU technology. The NAIRR H100 supplement positions it as premier platform for AI research democratization.

**Frontera** maintains position as largest academic x86 supercomputer focused on sustained capability computing. Massive 44 PB scratch storage supports largest-scale data-intensive workflows.

**Stampede3** deploys diverse CPU architectures including Intel Xeon MAX with HBM2e on-package memory delivering 8× memory bandwidth for memory-bound applications. First TACC deployment of Intel Ponte Vecchio GPUs.

**Lonestar6** represents TACC's AMD EPYC deployment with excellent per-core performance and energy-efficient hybrid cooling using GRC liquid immersion technology.

**Vista** breaks TACC tradition with ARM architecture (NVIDIA Grace) and unified memory CPU-GPU design eliminating PCIe bottlenecks. Grace Hopper provides 900 GB/s CPU-GPU bandwidth via NVLink.

## Documentation and support resources

### System-specific documentation

**Jetstream-2 resources:**
- Main documentation: https://docs.jetstream-cloud.org/
- Configuration specifications: https://docs.jetstream-cloud.org/overview/config/
- Instance flavors guide: https://docs.jetstream-cloud.org/general/instance-flavors/
- GPU FAQ: https://docs.jetstream-cloud.org/faq/gpu/
- Storage overview: https://docs.jetstream-cloud.org/general/storage/
- CACAO interface: https://docs.jetstream-cloud.org/ui/cacao/

**TACC system documentation:**
- Documentation portal: https://docs.tacc.utexas.edu/
- Frontera guide: https://docs.tacc.utexas.edu/hpc/frontera/
- Stampede3 guide: https://docs.tacc.utexas.edu/hpc/stampede3/
- Lonestar6 guide: https://docs.tacc.utexas.edu/hpc/lonestar6/
- Vista guide: https://docs.tacc.utexas.edu/hpc/vista/
- Ranch archive: https://docs.tacc.utexas.edu/hpc/ranch/
- Corral storage: https://docs.tacc.utexas.edu/hpc/corral/

### Allocation and access portals

**ACCESS-CI resources:**
- Main portal: https://access-ci.org/
- Allocations system: https://allocations.access-ci.org/
- Resource catalog: https://allocations.access-ci.org/resources
- Exchange calculator: https://allocations.access-ci.org/exchange_calculator
- Identity management: https://identity.access-ci.org/
- Support: https://support.access-ci.org/

**NAIRR resources:**
- NAIRR Pilot portal: https://nairrpilot.org
- NAIRR allocations: https://nairrpilot.org/opportunities/allocations

**Texas allocations:**
- TxRAS portal: https://submit-tacc.xras.org/

**CyVerse resources:**
- Main site: https://cyverse.org/
- Data Store: https://cyverse.org/data-store
- Documentation: https://docs.cyverse.org/
- System overview: https://docs.cyverse.org/services/system_overview/
- TACC partnership: https://tacc.utexas.edu/research/tacc-research/cyverse/
- Cloud Native Camp: https://cc.cyverse.org/cloud/js2/

### Support channels and training

**Jetstream-2 support:**
- Email: help@jetstream-cloud.org
- Office hours: Every Tuesday, 2-3 PM Eastern
- Operations dashboard: https://operations.access-ci.org/node/576
- Community: Matrix communication network

**TACC support:**
- General TACC systems: https://tacc.utexas.edu/use-tacc/
- Software catalog: https://tacc.utexas.edu/use-tacc/software-list/
- Training resources: https://tacc.utexas.edu/use-tacc/training/
- Allocations info: https://tacc.utexas.edu/use-tacc/allocations/

**ACCESS support:**
- Help desk: Submit tickets via https://support.access-ci.org/
- Office hours and training: Various scheduled sessions
- Documentation: Comprehensive user guides for all resources

## Conclusion

CyVerse partnerships with Jetstream-2 and TACC deliver complementary HPC capabilities spanning cloud-native flexibility and traditional supercomputing power. Jetstream-2's 8 petaFLOPS virtual infrastructure excels at workflows requiring on-demand scaling, persistent services, and accessible interfaces for researchers with limited HPC experience, while the NAIRR H100 program provides cutting-edge AI acceleration. TACC's four systems contribute over 50 petaFLOPS including Frontera's leadership-scale capability computing, Stampede3's architectural diversity with HBM CPUs, Lonestar6's focused Texas research support, and Vista's ARM-based AI innovation with 600 H200 GPUs.

The 6+ PB CyVerse data store mirrored nightly at TACC ensures geographic redundancy and high-performance access from TACC HPC systems, critical for data-intensive bioinformatics workflows. Combined capacity exceeds 92 PB usable storage across all systems plus exabyte-scale tape archive. Unified ACCESS-CI allocations simplify access through standardized proposal mechanisms scaling from 400K to millions of service units, while TxRAS serves Texas researchers and NAIRR pilot programs accelerate AI research democratization. Together these partnerships position CyVerse researchers with extraordinary computational breadth from flexible cloud instances to some of the nation's most powerful academic supercomputers.