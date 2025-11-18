# Northern Arizona University HPC Computing Resources

## Documentation Sources

**Primary Documentation:**
- Advanced Research Computing (ARC) Main Page: https://in.nau.edu/arc/
- ARC Overview: https://in.nau.edu/arc/overview/
- Using the Monsoon Cluster - Introduction: https://in.nau.edu/arc/overview/using-the-cluster-introduction/
- Monsoon Cluster Details: https://in.nau.edu/arc/details/
- Monsoon Information Technology Services: https://in.nau.edu/its/monsoon/
- Monsoon User Agreement: https://in.nau.edu/arc/overview/user-agreement/
- Request Storage: https://in.nau.edu/arc/request-storage/

**Training Materials:**
- Intro to Monsoon and Slurm Workshop (PDF): https://rcdata.nau.edu/hpcpub/workshops/odintro.pdf
- Pedagogic Modules - Monsoon Cluster: https://jan.ucc.nau.edu/mg2745/pedagogic_modules/courses/hpcdataintensive/slurm_1/

**News:**
- NAU Computing Cluster Launch Announcement: https://news.nau.edu/nau-computing-cluster-coming-online-workshop-april-29/

---

## Main HPC System: Monsoon

| Cluster | Total Nodes | Total CPU Cores | Total GPUs | Total System Memory |
|---------|-------------|-----------------|-----------|---------------------|
| **Monsoon** | 104 | 5,940 | 24 | ~14 TB |

---

## Detailed Node Specifications

### CPU Compute Nodes

| Node Type | Node Range | Number of Nodes | CPUs/Node | Cores/CPU | Total Cores/Node | CPU Model | Base Freq | Boost Freq | RAM/Node |
|-----------|------------|-----------------|-----------|-----------|------------------|-----------|-----------|------------|----------|
| **AMD EPYC 7542** | cn4-cn28 | 25 | 2 | 32 | 64 | AMD EPYC 7542 32-Core | 2.9 GHz | 3.4 GHz | 248 GiB* |
| **Intel E5-2680 v4** | cn35-cn69 | 35 | 2 | 28 | 56 | Intel Xeon E5-2680 v4 | 2.4 GHz | 3.3 GHz | 123 GiB |
| **Intel Gold 6132** | cn70-cn105 | 36 | 2 | 28 | 56 | Intel Xeon Gold 6132 | 2.6 GHz | 3.7 GHz | 187 GiB |
| **Intel Gold 6242** | cn106-cn108 | 3 | 2 | 32 | 64 | Intel Xeon Gold 6242 | 2.8 GHz | 3.9 GHz | 250 GiB |

*Note: cn28-cn30 have 2011 GiB (high memory nodes)

**CPU Compute Totals:**
- Total Nodes: 99
- Total CPU Cores: 5,768
- Total Memory: ~13.5 TB

---

### GPU Compute Nodes

| Node | CPUs/Node | Cores/CPU | Total CPU Cores | CPU Model | Base Freq | Boost Freq | RAM | GPUs/Node | GPU Model | GPU Memory |
|------|-----------|-----------|-----------------|-----------|-----------|------------|-----|-----------|-----------|------------|
| **cn1** | 2 | 28 | 56 | Intel Xeon Gold 6132 | 2.6 GHz | 3.7 GHz | 380 GB | 4 | Tesla V100-SXM2-16GB | 16 GB |
| **cn3** | 2 | 64 | 128 | Intel Xeon Platinum 8358 | 2.6 GHz | 3.4 GHz | 500 GB | 4 | Tesla A100 | 40 GB |
| **cn31** | 2 | 24 | 48 | Intel Xeon E5-2680 v3 | 2.5 GHz | 3.3 GHz | 123 GB | 4 | Tesla K80 | 12 GB |
| **cn32** | 2 | 28 | 56 | Intel Xeon E5-2680 v4 | 2.4 GHz | 3.3 GHz | 123 GB | 8 | Tesla K80 | 12 GB |
| **cn33** | 2 | 28 | 56 | Intel Xeon E5-2680 v4 | 2.4 GHz | 3.3 GHz | 123 GB | 4 | Tesla P100-PCIE-16GB | 16 GB |

**GPU Compute Totals:**
- Total GPU Nodes: 5
- Total CPU Cores (GPU nodes): 172
- Total GPUs: 24
  - 4× V100 16GB
  - 4× A100 40GB
  - 12× K80 12GB (4 + 8)
  - 4× P100 16GB
- Total GPU Memory: ~440 GB

---

## Combined Monsoon System Resources

| Metric | Value |
|--------|-------|
| **Total Nodes** | 104 (99 CPU + 5 GPU) |
| **Total CPU Cores** | 5,940 |
| **Total GPUs** | 24 |
| **Total System Memory** | ~14 TB |
| **GPU FP32 Performance** | ~288 TFLOPS (0.288 PFLOPS) |
| **GPU FP64 Performance** | ~143 TFLOPS (0.143 PFLOPS) |
| **AI/Tensor Performance** | ~1.75 PFLOPS |

---

## GPU Performance Breakdown

| GPU Model | Count | FP32/GPU | FP64/GPU | Tensor/GPU | Total FP32 | Total FP64 | Total Tensor |
|-----------|-------|----------|----------|------------|------------|------------|--------------|
| **Tesla V100-SXM2** | 4 | 15.7 TFLOPS | 7.8 TFLOPS | 125 TFLOPS | 62.8 TFLOPS | 31.2 TFLOPS | 500 TFLOPS |
| **Tesla A100 40GB** | 4 | 19.5 TFLOPS | 9.7 TFLOPS | 312 TFLOPS | 78 TFLOPS | 38.8 TFLOPS | 1,248 TFLOPS |
| **Tesla K80** | 12 | 8.73 TFLOPS | 2.91 TFLOPS | - | 104.8 TFLOPS | 34.9 TFLOPS | - |
| **Tesla P100-PCIE** | 4 | 10.6 TFLOPS | 5.3 TFLOPS | 21.2 TFLOPS (FP16) | 42.4 TFLOPS | 21.2 TFLOPS | 84.8 TFLOPS |
| **Total** | **24** | - | - | - | **288 TFLOPS** | **126.1 TFLOPS** | **~1.75 PFLOPS** |

---

## System Access and Usage

### Access Methods
- **Web Portal:** [NAU Research Computing Portal](https://in.nau.edu/arc/)
- **SSH Access:** Available for authorized users
- **SLURM Scheduler:** Job submission and management

### Key Features
- **High Memory Nodes:** cn28-cn30 with 2 TB RAM each
- **Modern GPUs:** A100 and V100 for AI/ML workloads
- **Legacy GPU Support:** K80 and P100 for compatible applications
- **Diverse CPU Architecture:** AMD EPYC and Intel Xeon options

---

## Historical Context

### Monsoon Deployment (~2016-2020)
The Monsoon cluster was deployed in phases:

1. **Initial Deployment (2016-2017):** Intel Xeon E5-2680 v4 Broadwell nodes
2. **Expansion (2018-2019):** Intel Xeon Gold 6132 Skylake nodes
3. **Modern Upgrade (2020):** AMD EPYC 7542 nodes and Intel Gold 6242
4. **GPU Additions:** Incremental GPU node additions from K80 through A100

**Contemporary Assessment:**
- At time of purchase, nodes were generally 1-2 years behind cutting edge
- Focused on value and longevity over absolute peak performance
- GPU additions have kept pace with evolving AI/ML demands

---

## Comparison to UA and ASU

| Metric | NAU | UA | ASU |
|--------|-----|----|----|
| **CPU Cores** | 5,940 | 43,688 | 39,900 |
| **GPUs** | 24 | 163 | 632 |
| **System Memory** | ~14 TB | 256 TB | 203 TB |
| **GPU FP32** | 0.29 PFLOPS | 2.08 PFLOPS | 12 PFLOPS |
| **AI/Tensor** | 1.75 PFLOPS | 10.5 PFLOPS | 150 PFLOPS |

**Scale Factor (relative to NAU):**
- UA is ~7.4× larger in CPU cores, ~6.8× more GPUs
- ASU is ~6.7× larger in CPU cores, ~26× more GPUs
- ASU has ~86× more AI/Tensor performance than NAU

---

## AFORCE Partnership

NAU participates in the **Arizona Force (AFORCE)** partnership alongside UA and ASU:
- **NSF Award:** OAC-2126303
- **Collaboration:** Shared access to resources across three universities
- **Integration:** Open Science Grid connectivity
- **Research Support:** Computational resources for Arizona researchers

---

## Strengths and Focus

1. **Right-Sized:** Appropriate scale for NAU's research community
2. **Diverse Architecture:** Mix of AMD and Intel CPUs for workload flexibility
3. **Modern GPU Capability:** A100 and V100 GPUs for contemporary AI/ML research
4. **High Memory Options:** 2 TB nodes for memory-intensive applications
5. **Sustainable Model:** Incremental growth and strategic upgrades

---

## Conclusions

Northern Arizona University's Monsoon cluster represents a focused, well-balanced HPC resource:

1. **Strategic Sizing:** ~6,000 CPU cores appropriate for NAU's research scale
2. **GPU Investment:** 24 GPUs including modern A100 and V100 accelerators
3. **Partnership Benefits:** Access to larger UA and ASU resources via AFORCE
4. **Incremental Growth:** Phased deployment strategy ensuring longevity
5. **Research Enablement:** Sufficient capacity for computational science, AI/ML, and data analysis

While significantly smaller than UA and ASU, NAU's HPC infrastructure effectively serves its research community and demonstrates the value of the tri-university AFORCE collaboration.
