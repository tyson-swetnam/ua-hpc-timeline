# Arizona State University HPC Computing Resources

## Documentation Sources

**Primary Documentation:**
- Supercomputer Hardware Specifications: https://docs.rc.asu.edu/supercomputer-hardware
- Research Computing Overview: https://asurc.atlassian.net/wiki/spaces/RC/overview
- Sol Supercomputer Page: https://asurc.atlassian.net/wiki/spaces/RC/pages/1852637228/The+Sol+supercomputer
- Research Computing Capabilities: https://cores.research.asu.edu/research-computing/capabilities
- About Research Computing: https://cores.research.asu.edu/research-computing/about

**Academic Publications:**
- Sol Supercomputer PEARC '23 Paper (ACM): https://dl.acm.org/doi/10.1145/3569951.3597573
- Sol Supercomputer PEARC '23 Paper (Full HTML): https://dl.acm.org/doi/fullHtml/10.1145/3569951.3597573
- Sol Supercomputer PEARC '23 Paper (PDF): https://openondemand.org/sites/default/files/documents/PEARC23_ASU-Sol-paper.pdf
- Research Computing Facilities Statement (PDF): https://cores.research.asu.edu/sites/default/files/2024-05/Research%20Computing%20Facilities%20Statement.pdf

**News Articles:**
- ASU News - Sol Launch Announcement: https://news.asu.edu/20220526-solutions-new-dawn-supercomputing-asu
- HPCwire - Sol Launch Coverage: https://www.hpcwire.com/2022/07/13/asu-launching-sol-supercomputer/
- Data Center Dynamics - Sol Announcement: https://www.datacenterdynamics.com/en/news/asu-to-launch-sol-supercomputer-this-summer/

---

## Main HPC Systems

| System | Year Deployed | Vendor | Architecture | Total CPU Cores | Total GPUs | Total System Memory |
|--------|---------------|---------|--------------|-----------------|-----------|---------------------|
| **Sol** | 2022 | Dell Technologies | Homogeneous (AMD EPYC) | ~21,000+ | 290+ (A100, A30, H100) | >113 TB |
| **Phoenix (Agave)** | 2018 | Dell Technologies | Heterogeneous (Intel) | ~17,200+ | ~360 (V100, A100, others) | ~80 TB |
| **Combined** | - | - | - | **~38,200+** | **~650+** | **~193 TB** |

---

## Sol Supercomputer (Primary System)

### Overview
- **Launched:** Summer 2022
- **Location:** Iron Mountain Data Center, Phoenix, AZ (off-campus)
- **Architecture:** Homogeneous (all same CPU/architecture type)
- **System Type:** Dell-built cluster
- **TOP500 Ranking:** #388 (June 2023) with 2.272 PFLOPS
- **Funding:** ASU President's Office + University Technology Office IT Bond

### Detailed Node Specifications

| Node Type | Number of Nodes | CPUs/Node | CPU Model | RAM/Node | GPUs/Node | GPU Model | RAM/GPU | Total GPUs |
|-----------|-----------------|-----------|-----------|----------|-----------|-----------|---------|------------|
| **Standard Compute** | ~130+ | 128 | 2× AMD EPYC 7713 (Zen3) | 512 GB | - | - | - | - |
| **High Memory** | 7 | 128 | 2× AMD EPYC 7713 (Zen3) | 2,048 GB | - | - | - | - |
| **GPU A100** | 56 | 48 | 2× AMD EPYC 7413 (Zen3) | 512 GB | 4 | NVIDIA A100 SXM4 | 80 GB | 224 |
| **GPU A30** | 5 | 48 | 2× AMD EPYC 7413 (Zen3) | 512 GB | 3 | NVIDIA A30 PCIe | 24 GB | 15 |
| **GPU MIG** | Variable | 48 | 2× AMD EPYC 7413 (Zen3) | 512 GB | 16 | A100 slices (MIG) | 20/10 GB | 16 slices |
| **GraceHopper** | 1+ | 72 | NVIDIA Grace CPU (ARM) | 512 GB | 1 | NVIDIA GH200 | 480 GB | 1+ |
| **GPU H100** | Few | 48 | 2× AMD EPYC 7413 (Zen3) | 512 GB | 4 | NVIDIA H100 | 80 GB | ~8-12 |
| **GPU MI200** | 1+ | 24 | AMD EPYC 9254 (Zen4) | 77 GB | 2 | AMD MI200 | 64 GB | 2+ |
| **Xilinx FPGA** | 1+ | 48 | 2× AMD EPYC 7443 (Zen3) | 256 GB | 1 | Xilinx U280 | - | - |
| **BittWare FPGA** | 1 | 52 | Intel Xeon Gold 6230R | 376 GB | 1 | BittWare 520N-MX | - | - |
| **NEC Vector** | 1+ | 48 | 2× AMD EPYC 9274F (Zen4) | 512 GB | 1 | NEC Vector Engine | - | - |

### Sol System Specifications

**Processor Details:**
- **Standard/High Memory Nodes:** AMD EPYC 7713 (Milan, Zen3)
  - 64 cores per CPU × 2 CPUs = 128 cores per node
  - Base clock: 2.0 GHz, Boost: 3.675 GHz
  - Process: TSMC 7nm
  - Total: ~17,900 Zen3 cores

- **GPU Nodes:** AMD EPYC 7413 (Milan, Zen3)
  - 24 cores per CPU × 2 CPUs = 48 cores per node
  - Base clock: 2.65 GHz, Boost: 3.6 GHz

**Network Infrastructure:**
- **InfiniBand:** HDR 200 Gb/s (Mellanox QM8700 series switches)
- **Over-subscription Rate:** 2.3:1
- **Ethernet:** 25 Gb/s for management, 100 Gb/s for data transfer node

**Storage:**
- **Scratch Storage:** 4 PB Dell BeeGFS with 90-day retention policy
- **Project Storage:** 2 PB Dell PowerScale (Isilon)
- **Home Directories:** 2 PB allocation (100 GB per researcher)
- **Connectivity:** 100 Gb/s fiber to on-campus data center (4 miles, 2ms latency)

### Sol GPU Computing Power

| GPU Type | Count | FP32/GPU | FP64/GPU | Tensor/GPU | Total FP32 | Total Tensor |
|----------|-------|----------|----------|------------|------------|--------------|
| **A100 80GB** | 224 | 19.5 TFLOPS | 9.7 TFLOPS | 312 TFLOPS | 4,368 TFLOPS | 69.9 PFLOPS |
| **A30 24GB** | 15 | 10.3 TFLOPS | 5.2 TFLOPS | 165 TFLOPS | 154.5 TFLOPS | 2.5 PFLOPS |
| **H100 80GB** | ~10 | 67 TFLOPS | 34 TFLOPS | 2,000 TFLOPS | 670 TFLOPS | 20 PFLOPS |
| **GH200** | 1+ | 67+ TFLOPS | 34+ TFLOPS | 2,000+ TFLOPS | 67+ TFLOPS | 2+ PFLOPS |
| **MI200** | 2 | 47.9 TFLOPS | 47.9 TFLOPS | - | 95.8 TFLOPS | - |
| **Total (Sol)** | **~252+** | - | - | - | **~5.4 PFLOPS** | **~94+ PFLOPS** |

---

## Phoenix Supercomputer (Legacy/Heterogeneous System)

### Overview
- **Launched:** 2018 (as "Agave," later consolidated into "Phoenix")
- **Location:** ISTB1, Tempe Campus (on-campus)
- **Architecture:** Heterogeneous (mixed Intel CPUs, various generations)
- **System Type:** Dell-built cluster
- **Status:** Operational, continues to serve researchers alongside Sol

### Detailed Node Specifications

| Node Type | Number of Nodes | CPUs/Node | CPU Model | RAM/Node | GPUs/Node | GPU Model | RAM/GPU | Total GPUs |
|-----------|-----------------|-----------|-----------|----------|-----------|-----------|---------|------------|
| **Standard Compute** | ~500+ | 28 | 2× Intel Broadwell E5-2695v4 | 128 GB | - | - | - | - |
| **High Memory** | 3 | 56 | 2× Intel Skylake Xeon Gold 6132 | 1,500-2,000 GB | - | - | - | - |
| **GPU V100** | ~90 | 40 | 2× Intel Skylake Xeon Gold 6148 | 360 GB | 4 | NVIDIA V100 | 32 GB | ~360 |
| **Intel Phi** | Few | 256 | 2× Intel Knights Landing | 128 GB | - | (integrated) | - | - |

### Phoenix System Specifications

**Processor Details:**
- **Standard Nodes:** Intel Xeon E5-2695 v4 (Broadwell)
  - 14 cores per CPU × 2 CPUs = 28 cores per node
  - Base clock: 2.1 GHz
  - Process: Intel 14nm
  
- **High Memory Nodes:** Intel Xeon Gold 6132 (Skylake)
  - 28 cores per CPU × 2 CPUs = 56 cores per node
  - Base clock: 2.6 GHz

- **GPU Nodes:** Intel Xeon Gold 6148 (Skylake)
  - 20 cores per CPU × 2 CPUs = 40 cores per node
  - Base clock: 2.4 GHz

**Total Resources (Phoenix/Agave):**
- **Total CPU Cores:** ~17,200+
- **Total GPUs:** ~360 (primarily V100 32GB, plus some A100s and GTX 1080 Ti from condo nodes)
- **System Memory:** ~80 TB
- **Network:** Mix of InfiniBand and Ethernet

### Phoenix GPU Computing Power

| GPU Type | Estimated Count | FP32/GPU | FP64/GPU | Tensor/GPU | Total FP32 | Total Tensor |
|----------|-----------------|----------|----------|------------|------------|--------------|
| **V100 32GB** | ~360 | 15.7 TFLOPS | 7.8 TFLOPS | 125 TFLOPS | 5,652 TFLOPS | 45 PFLOPS |
| **Others (A100, 1080Ti)** | Variable | Variable | Variable | Variable | ~500 TFLOPS | ~5 PFLOPS |
| **Total (Phoenix)** | **~360** | - | - | - | **~6.2 PFLOPS** | **~50 PFLOPS** |

---

## Secure Computing Environment

### FISMA-High Compliant Secure HPC
- **CPU Cores:** 1,700
- **GPUs:** 20× NVIDIA A100 80GB
- **Purpose:** HIPAA-compliant research on sensitive data
- **Management:** HIPAA Covered Entity
- **Security:** FISMA-High compliant

**GPU Performance (Secure Environment):**
- **Total FP32:** 390 TFLOPS
- **Total Tensor:** 6.2 PFLOPS

---

## Combined ASU HPC Resources

### Total System Capacity

| Metric | Sol | Phoenix | Secure | Total |
|--------|-----|---------|--------|-------|
| **CPU Cores** | ~21,000 | ~17,200 | 1,700 | **~39,900** |
| **Total GPUs** | ~252 | ~360 | 20 | **~632** |
| **System Memory** | >113 TB | ~80 TB | ~10 TB | **~203 TB** |
| **FP32 Performance** | ~5.4 PFLOPS | ~6.2 PFLOPS | 0.39 PFLOPS | **~12 PFLOPS** |
| **AI/Tensor Performance** | ~94 PFLOPS | ~50 PFLOPS | 6.2 PFLOPS | **~150 PFLOPS** |

### Storage Infrastructure

| Storage Type | Capacity | Purpose |
|-------------|----------|---------|
| **BeeGFS Scratch** | 4 PB | High-performance temporary storage (Sol) |
| **PowerScale Project** | 2 PB | Long-term project storage (Sol) |
| **Home Directories** | 2 PB | User home directories |
| **Network Storage** | 10 PB | Project-term research data storage |
| **Tape Archive** | Large | Long-term archival via Spectra Logic |
| **Total** | **~18+ PB** | Combined available storage |

---

## Sol Performance Benchmarks

### HPL (High Performance Linpack) - March 2023
- **Configuration:** 52 A100 nodes (208 GPUs)
- **Performance:** 2.272 PFLOPS (64-bit FP)
- **Efficiency:** ~75% (theoretical peak ~3 PFLOPS)
- **TOP500 Ranking:** #388 (June 2023)

### Single Node Performance
- **A100 Node (4 GPUs):** ~57 TFLOPS per node
- **Standard Compute Node (128 cores):** High CPU throughput for parallel workloads

---

## Tri-University Collaboration

ASU Research Computing resources are available to:
- **Arizona State University** researchers (primary)
- **University of Arizona** researchers (via AFORCE partnership)
- **Northern Arizona University** researchers (via AFORCE partnership)

**AFORCE Partnership (NSF OAC-2126303):**
- Dedicated nodes on Sol for tri-university use
- Integration with Open Science Grid
- Shared GPU resources for regional research collaboration

---

## GPU Performance Summary by Type

| GPU Model | FP32 Performance | FP64 Performance | Tensor/AI Performance | Memory | Count at ASU |
|-----------|------------------|------------------|-----------------------|---------|--------------|
| **NVIDIA A100 80GB** | 19.5 TFLOPS | 9.7 TFLOPS | 312 TFLOPS | 80 GB HBM2e | 244 (Sol + Secure) |
| **NVIDIA H100 80GB** | 67 TFLOPS | 34 TFLOPS | 2,000 TFLOPS (FP8) | 80 GB HBM3 | ~10 (Sol) |
| **NVIDIA A30 24GB** | 10.3 TFLOPS | 5.2 TFLOPS | 165 TFLOPS | 24 GB HBM2 | 15 (Sol) |
| **NVIDIA V100 32GB** | 15.7 TFLOPS | 7.8 TFLOPS | 125 TFLOPS | 32 GB HBM2 | ~360 (Phoenix) |
| **NVIDIA GH200** | 67+ TFLOPS | 34+ TFLOPS | 2,000+ TFLOPS | 480 GB | 1+ (Sol) |
| **AMD MI200** | 47.9 TFLOPS | 47.9 TFLOPS | Matrix cores | 64 GB HBM2e | 2+ (Sol) |

---

## Historical Context and Procurement Strategy

### Sol (2022) - Contemporary Analysis
**At time of purchase (2022):**
- **AMD EPYC 7713:** 128 cores/node was **state-of-the-art** for HPC (launched 2021)
- **NVIDIA A100 80GB:** **Top-tier datacenter GPU** at the time (launched 2020)
- **Position:** 100% of contemporary peak performance
- **Architecture:** Zen3 (Milan) represented cutting-edge 7nm process technology

**Comparison to 2022 typical dual-socket server:**
- Typical 2022: 96-128 cores (AMD EPYC Genoa not yet available)
- Sol standard nodes: 128 cores per node
- **Assessment:** At or above industry leading edge

### Phoenix/Agave (2018) - Contemporary Analysis
**At time of purchase (2018):**
- **Intel Broadwell/Skylake:** 28-40 cores/node was **above average** for 2018
- **NVIDIA V100 32GB:** **Top-tier datacenter GPU** at the time (launched 2017)
- **Position:** 80-100% of contemporary peak performance

**Comparison to 2018 typical dual-socket server:**
- Typical 2018: 24-40 cores (Intel Skylake-SP)
- Phoenix/Agave: 28-56 cores per node
- **Assessment:** At or above industry standard

---

## Growth and Expansion

### Sol Growth Since 2022
- **Initial Launch (2022):** 178 nodes, ~18,000 cores, 224 A100 + 15 A30 GPUs
- **Current (2025):** 21,000+ cores, 290+ GPUs including H100s and GH200
- **Growth:** ~17% core increase, ~30% GPU increase in 3 years
- **Condo Model:** Faculty-purchased nodes integrated into general pool opportunistically

### Phoenix/Agave Growth Since 2018
- **Initial Launch (2018):** ~8,000 cores, limited GPUs
- **Peak (2022):** ~16,000+ cores, 360+ GPUs
- **Growth:** 2× core increase, significant GPU additions
- **Status:** Now supplemented by Sol, continues serving heterogeneous workloads

---

## Special Features and Capabilities

### Advanced Hardware
- **NVIDIA Grace Hopper GH200:** ARM-based CPU + H200 GPU superchip
- **FPGA Resources:** Xilinx U280, BittWare 520N-MX for hardware acceleration
- **NEC Vector Engine:** Specialized vector processing capability
- **AMD MI200:** AMD's datacenter GPU for comparison/diversity

### Multi-Instance GPU (MIG)
- **Capability:** Partition A100 GPUs into up to 7 independent slices
- **Use Case:** Efficient GPU sharing for smaller workloads
- **Configuration:** 10 GB and 20 GB slices available
- **Workshop Use:** 280 GPU slices provided for HPC symposium training

### Quantum Computing Integration
- **Partnership:** IBM Quantum via Quantum Innovation Collaborative (QIC)
- **Hardware:** 127-qubit NISQ systems
- **Simulation:** NVIDIA cuQuantum on Sol GPUs
- **Software:** IBM Qiskit, NVIDIA CUDA-Quantum, Google Cirq, AWS Braket

---

## Data Center Infrastructure

### Sol at Iron Mountain Phoenix
- **Certification:** First North America data center with BREEAM design certification
- **Security:** FISMA-High compliant
- **Cooling:** Industrial-scale cooling for high-density computing
- **Power:** Redundant power systems
- **Network:** 100 Gb/s connectivity to ASU Tempe campus
- **Warranty:** 5-year Dell warranty on all equipment

### Connectivity
- **Campus Link:** 100 Gb/s private fiber (4 miles, 2ms latency)
- **Data Transfer:** 100 Gb/s dedicated DTN (Data Transfer Node)
- **Security:** Dual 100 Gb/s FortiGate-3401E firewalls
- **Protocols:** Globus for high-speed data movement

---

## Dell Center of Excellence

ASU is designated a **Dell Center of Excellence for HPC and Artificial Intelligence**:
- 3rd such center in the United States
- 6th globally
- Close collaboration with Dell on system architecture and design
- Focus on innovation in HPC and AI infrastructure

---

## Key Strengths and Differentiators

1. **Scale:** Combined 39,900+ CPU cores and 632+ GPUs across two systems
2. **Diversity:** Both homogeneous (Sol) and heterogeneous (Phoenix) architectures
3. **Modern GPUs:** Heavy investment in A100, H100, and cutting-edge GH200 technology
4. **AI Focus:** ~150 PFLOPS of AI/Tensor computing power
5. **Regional Collaboration:** Tri-university access (ASU, UA, NAU)
6. **Quantum Integration:** Unique quantum computing + HPC hybrid capability
7. **Rapid Growth:** Aggressive expansion model (doubled Agave size, Sol continues growing)
8. **Strategic Location:** Professional data center (Iron Mountain) for optimal infrastructure

---

## Conclusions

Arizona State University has built one of the most comprehensive academic HPC ecosystems in the Southwest:

1. **Strategic Procurement:** Both Sol (2022) and Phoenix/Agave (2018) were deployed with contemporary, top-tier hardware
2. **Massive Scale:** ~40,000 CPU cores and ~150 PFLOPS of AI computing power
3. **Technology Leadership:** Early adoption of A100 80GB, H100, and Grace Hopper GH200
4. **Sustained Investment:** Continuous growth model with faculty condo purchases
5. **Regional Impact:** Serving three major Arizona universities through AFORCE partnership

ASU's Research Computing infrastructure represents a significant competitive advantage for computational research, particularly in AI/ML applications where the system's 150 PFLOPS of Tensor performance places it among the most capable academic AI supercomputers in the United States.