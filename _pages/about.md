---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

I currently work as an assistant professor with Beijing University of Posts and Telecommunications. Before that, I was a postdoc research fellow with Department of Computer Science and Technology, Tsinghua University from 2021 to 2023. I received the PhD degree at Beijing Institute of Technology in 2021, and received the bachelor degree at Beijing Information Science & Technology University, in 2016. 

My research interests include datamining, recommendation systems, graph representation learning, etc.
For my full (and timely) publication list, please refer to my google scholar <a href='https://scholar.google.com/citations?user=pAfNfScAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>.


# News
- *2023.09*: &nbsp; I have been admintted as a master supervisor, and there is still one vacancy for the master candidate enrollment in 2024 (only for students taking the postgraduate entrance examination).
- *2023.09*: &nbsp; As an assistant professor, I joined the School of Computer Science, Beijing University of Posts and Telecommunications, and worked closely with <a href='https://teacher.bupt.edu.cn/songmeina/zh_CN/index.htm'>Prof. Meina Song</a>,  <a href='https://teacher.bupt.edu.cn/ouzhonghong/zh_CN/index.htm'>Prof. Zhonghong Ou</a>, and  <a href='https://teacher.bupt.edu.cn/ehaihong/zh_CN/index.htm'>Prof. Haihong E</a>. 

# Publications 

<!-- <div class='paper-box'><div class='paper-box-image'><div><div class="badge">CVPR 2016</div><img src='images/500x300.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Deep Residual Learning for Image Recognition](https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf)

**Kaiming He**, Xiangyu Zhang, Shaoqing Ren, Jian Sun

[**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
</div>
</div>

- [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet](https://github.com), A, B, C, **CVPR 2020** -->

## 2023

- ``ICDM 2023`` Z. Han, Z. Ou, ***Y. Zhu***, X. Li, and M. Song. ***FM-IGNN: Interaction Graph Neural Network with Fine-grained Matching for Session-based Recommendation***, In Proceedings of the IEEE International Conference on Data Mining (ICDM), 2023.

- ``ECML-PKDD 2023`` M. Zhou, W. Feng, ***Y. Zhu***, D. Zhang, Y. Dong and J. Tang. ***Semi-Supervised Social Bot Detection with Initial Residual Relation Attention Networks***, In Proceedings of the European Conference on Machine Learning and Principles and Practice of Knowledge Discovery (ECML PKDD), 2023. [Paper](https://link.springer.com/chapter/10.1007/978-3-031-43427-3_13) (Runner-up best paper award).

- ``KDD 2023`` ***Y. Zhu***, F. Cong, D. Zhang, W. Gong, Q. Lin, W. Feng, Y. Dong, and J. Tang.  ***WinGNN: Dynamic Graph Neural Networks with Random Gradient Aggregation Window***, 29th ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD'23), 2023. [Paper](https://dl.acm.org/doi/abs/10.1145/3580305.3599551) [Code](https://github.com/THUDM/WinGNN) <div class="badge">CCF-A</div>

- ```IEEE TKDE``` ***Y. Zhu***, Q. Lin, H. Lu, K. Shi, D. Liu, J. Chambua, S. Wan, and Z. Niu, ***Recommending Learning Objects through Attentive Heterogeneous Graph Convolution and Operation-Aware Neural Network***, IEEE Transactions on Knowledge and Data Engineering, 2023, 35(4):4178-4189. [Paper](https://ieeexplore.ieee.org/abstract/document/9606527) (CCF-A)

- ```IEEE TNNLS``` G. Shi, ***Y. Zhu***, J. Liu, X. Li. ***HeGCL: Advance Self-Supervised Learning in Heterogeneous Graph-level Representation***, IEEE Transactions on Neural Networks and Learning Systems, 2023 [Paper](https://ieeexplore.ieee.org/document/10135109) (IF: 14.255).


- ```WWW 2023``` D. Zhang, ***Y. Zhu***, Y. Dong, Y. Wang, W. Feng, E. Kharlamov, J. Tang. ***ApeGNN: Node-Wise Adaptive Aggregation in GNNs for Recommendation***, In Proceedings of the Web Conference 2023 (WWW'23), 759--769. [Paper](https://dl.acm.org/doi/abs/10.1145/3543507.3583530) [Code](https://github.com/THUDM/ApeGNN) (CCF-A)

## 2022

- ```CIKM 2022``` Z. Huai, Z. Wang, ***Y. Zhu***, P. Zhang. ***AMinerGNN: Heterogeneous Graph Neural Network for Paper Click-through Rate Prediction with Fusion Query***, Proceedings of the 31st ACM International Conference on Information \& Knowledge Management (CIKM'22), 4039-4043. [Paper](https://dl.acm.org/doi/abs/10.1145/3511808.3557544)

- ```BIBM 2022``` G. Shi, ***Y. Zhu***, F. Zhang, W. Liu, Y. Yao, X. Li. ***Fusion Learning of Multimodal Neuroimaging with Weighted Graph AutoEncoder***, In proceedings of the International Conference on Bioinformatics and Biomedicine (BIBM'2022), 2467-2473. [Paper](https://ieeexplore.ieee.org/abstract/document/9995243)

- ```SIGIR 2022``` Q. Lin, J. Liu, F. Xu, Y. Pan, ***Y. Zhu***, L. Zhang and T. Zhao. ***Incorporating Context Graph with Logical Reasoning for Inductive Relation Prediction***, Proceedings of the 45th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR'22), 893-903. (CCF-A) 

- ```IEEE TCSS``` T. Wang, ***Y. Zhu***, P. Ye, W. Gong, H. Lu, H. Mo, F.-Y. Wang, ***A New Perspective for Computational Systems:Fuzzy Modeling and Reasoning for Social Computing in CPSS***, IEEE Transactions on Computational Social Systems, 2022. [Paper](https://ieeexplore.ieee.org/abstract/document/9894383)

- ```IEEE TCSS``` K. Shi, H. Lu, ***Y. Zhu***, Z. Niu, ***Application of Social Sensors in Natural Disasters Emergency Management: A Review***, IEEE Transactions on Computational Social Systems, 2022. [Paper](https://ieeexplore.ieee.org/abstract/document/9923419)

- ```IEEE TCSS``` D. Liu, Y. Yuan, R. Qin, ***Y. Zhu***, C. Zhang, Z. Niu, ***A Local Self-Attention Sentence Model for Answer Selection Task in CQA Systems***, IEEE Transactions on Computational Social Systems, 2022. [Paper](https://ieeexplore.ieee.org/abstract/document/9861392)

- ```IEEE TITS``` H. Lu, ***Y. Zhu***, Q. Lin, T. Wang, Z. Niu, E. Herrera-Viedma. ***Heterogeneous knowledge learning of predictive academic intelligence in transportation***, IEEE Transactions on Intelligent Transportation Systems, 2022, 23(4):3737-3755. [Paper](https://ieeexplore.ieee.org/abstract/document/9298476/)

- ```IEEE TCDS``` G. Shi, ***Y. Zhu***, Z. Chen, J. Liu, X. Li, ***Are Non-image Data Really Necessary for Disease Prediction with Graph Convolutional Networks?***, IEEE Transactions on Cognitive and Developmental Systems, 2022, 15(1):252-260. [Paper](https://ieeexplore.ieee.org/abstract/document/9717290)

## 2021

- ```IEEE TCDS``` ***Y. Zhu***, X. Li ,  Y. Sun, H. Wang, H. Guo, and J. Sui, ***Investigating Neural Substrates of Individual Independence and Interdependence Orientations via Efficiency-based Dynamic Functional Connectivity: A Machine Learning Approach***, IEEE Transactions on Cognitive and Developmental Systems, 2022, 14(2):761-771. [Paper](https://ieeexplore.ieee.org/abstract/document/9502838)

- ```MIA``` ***Y. Zhu***, X. Li, Y. Qiao, R. Shang, G. Shi, Y. Shang, and H. Guo, ***Widespread Plasticity of Cognition-Related Brain Networks in Single-Sided Deafness Revealed by Randomized Window-Based Dynamic Functional Connectivity***, Medical Image Analysis, 2021, 73(474):102163. (IF:13.828)

- ```KBS``` ***Y. Zhu***, Q. Lin, H. Lu, K. Shi, P. Qiu, and Z. Niu, ***Recommending scientific paper via heterogeneous knowledge embedding based attentive recurrent neural networks***, Knowledge-Based Systems, 2021, 215: 106744. 

- ```FGCS``` Lin, Q., ***Y. Zhu***, H. Lu, K. Shi, and Z. Niu, ***Improving University Faculty Evaluations via multi-view Knowledge Graph***, Future Generation Computer Systems, 2021, 117:181-192. 

- ```Neuroimage``` G. Shi, X. Li, ***Y. Zhu***, R. Shang, Y. Sun, H. Guo, J. Sui, ***The divided brain: Functional brain asymmetry underlying self-construal***, NeuroImage, 2021, 240:118382.  

- ```IP&M``` K. Shi, Y. Wang, H. Lu, ***Y. Zhu***, Z. Niu, ***EKGTF: A knowledge-enhanced model for optimizing social network-based meteorological briefings***, Information Processing & Management, 2021, 58(4):102564. 

- ```TCSS``` H. Lu, ***Y. Zhu***, Y. Yuan, W. Gong, J. Li, K. Shi, Y. Lv, Z. Niu, F.-Y. Wang, ***Social Signal-Driven Knowledge Automation: A Focus on Social Transportation***, IEEE Transactions on Computational Social Systems, 2021, 8(3): 737-753.

- Y. Mao, \textbf{Y. Zhu}, Y. Liu, Q. Lin, H. Lu, F. Zhang, Classifying user connections through social media avatars and users social activities: a case study in identifying sellers on social media, Enterprise Information Systems, 2021, 16(8-9): 1856420.









# 🎖 Honors and Awards
- *2021.10* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.09* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 

# 📖 Educations
- *2019.06 - 2022.04 (now)*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2015.09 - 2019.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 

# 💬 Invited Talks
- *2021.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/)

# 💻 Internships
- *2019.05 - 2020.02*, [Lorem](https://github.com/), China.