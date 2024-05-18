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
For my full (and timely) publication list, please refer to my Google scholar <a href='https://scholar.google.com/citations?user=pAfNfScAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>.

<!-- https://img.shields.io/badge/Google%20Scholar-Yifan%20Zhu-blue?logo=Google%20Scholar -->
<!-- https://img.shields.io/endpoint?url=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fzhuyf8899%2Fzhuyf8899.github.io%40google-scholar-stats%2Fgs_data_shieldsio.json&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations -->
<!-- https://cdn.jsdelivr.net/gh/zhuyf8899/zhuyf8899.github.io@google-scholar-stats/gs_data_shieldsio.json -->

# 🔥 News
<span class='anchor' id='-news'></span>

- *2024.01* : &nbsp; I have been elected as an executive member of [CCF Data Governance Development Committee](https://www.ccf.org.cn/sjzlfzwyh/).
- *2023.12*: &nbsp; I have joined as an editorial board member of the [Information Fusion](https://www.sciencedirect.com/journal/information-fusion/about/editorial-board). 
<!-- - *2023.10*: &nbsp; We have organized a special issue entitiled "Applied Artificial Intelligence Approach: Intelligent Data Processing and Mining with Online Behaviors" on [Electronics](https://www.mdpi.com/journal/electronics/special_issues/D3L8Y3L5S7), and we warmly welcome submissions! -->
- *2023.09*: &nbsp; As an assistant professor, I joined in the School of Computer Science, Beijing University of Posts and Telecommunications, and worked closely with <a href='https://teacher.bupt.edu.cn/songmeina/zh_CN/index.htm'>Prof. Meina Song</a>,  <a href='https://teacher.bupt.edu.cn/ouzhonghong/zh_CN/index.htm'>Prof. Zhonghong Ou</a>, and  <a href='https://teacher.bupt.edu.cn/ehaihong/zh_CN/index.htm'>Prof. Haihong E</a>. 

# 📚 Publications 
<span class='anchor' id='-publications'></span>

<!-- <div class='paper-box'><div class='paper-box-image'><div><div class="badge">CVPR 2016</div><img src='images/500x300.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Deep Residual Learning for Image Recognition](https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf)

**Kaiming He**, Xiangyu Zhang, Shaoqing Ren, Jian Sun

[**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
</div>
</div>

- [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet](https://github.com), A, B, C, **CVPR 2020** -->

## 2024

- ``KDD 2024`` Fanjin Zhang, Shijie Shi, ***Yifan Zhu***, Bo Chen, Yukuo Cen, Jifan Yu, Yelin Chen, Lulu Wang, Qingfei Zhao, Yuqing Cheng, Tianyi Han, Yuwei An, Dan Zhang, Weng Lam Tam, Kun Cao, Yunhe Pang, Xinyu Guan, Huihui Yuan, Jian Song, XiaoYan Li, Yuxiao Dong, Jie Tang.  ***OAG-Bench: A Human-Curated Benchmark for Academic Graph Mining***. In 30th ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD'24), 2024. [Paper](https://arxiv.org/pdf/2402.15810) [Data](https://www.aminer.cn/data/) 

- ``ACL 2024`` Haoran Luo, Haihong E, Zichen Tang, Shiyao Peng, Yikai Guo, Wentai Zhang, Chenghao Ma, Guanting Dong, Meina Song, Wei Lin, ***Yifan Zhu***, Luu Anh Tuan. ***ChatKBQA: A Generate-then-Retrieve Framework for Knowledge Base Question Answering with Fine-tuned Large Language Models,*** In Fingdings of the 62nd Annual Meeting of the Association for Computational Linguistics (ACL'24), 2024. [Paper](https://arxiv.org/pdf/2310.08975) [Code](https://github.com/LHRLAB/ChatKBQA) 

- ```IEEE TCSS``` Gen Shi, Yuxiang Yao, ***Yifan Zhu***, Xinyue Lin, Lanxin Li, Wenjin Liu, Xuesong Li, ***Contrastive Hierarchical Augmentation Learning for Modeling Cognitive and Multimodal Brain Network***. IEEE Transactions on Computational Social Systems, 2024. [Paper](https://doi.org/10.1109/TCSS.2024.3402328) [Code](https://github.com/LeifYaoYuXiang/BrainNetworkCL) 


## 2023

- ``ICDM 2023`` Zongzhi Han, Zhonghong Ou, ***Yifan Zhu***, Xiaodong Li, and Meina Song. ***FM-IGNN: Interaction Graph Neural Network with Fine-grained Matching for Session-based Recommendation***. In Proceedings of the IEEE International Conference on Data Mining (ICDM), 2023. [Paper](https://ieeexplore.ieee.org/document/10415758/)

- ``ECML-PKDD 2023`` Ming Zhou, Wenzheng Feng, ***Yifan Zhu***, Dan Zhang, Yuxiao Dong and Jie Tang. ***Semi-Supervised Social Bot Detection with Initial Residual Relation Attention Networks***. In Proceedings of the European Conference on Machine Learning and Principles and Practice of Knowledge Discovery (ECML PKDD), 2023. [Paper](https://link.springer.com/chapter/10.1007/978-3-031-43427-3_13) (Runner-up best paper award)

- ``KDD 2023`` ***Yifan Zhu***, Fangpeng Cong, Dan Zhang, Wenwen Gong, Qika Lin, Wenzheng Feng, Yuxiao Dong, and Jie Tang.  ***WinGNN: Dynamic Graph Neural Networks with Random Gradient Aggregation Window***. In 29th ACM SIGKDD Conference on Knowledge Discovery and Data Mining (KDD'23), 2023. [Paper](https://dl.acm.org/doi/abs/10.1145/3580305.3599551) [Code](https://github.com/THUDM/WinGNN) 


- ```IEEE TKDE``` ***Yifan Zhu***, Qika Lin, Hao Lu, Kaize Shi, Donglei Liu, James Chambua, Shanshan Wan, and Zhendong Niu, ***Recommending Learning Objects through Attentive Heterogeneous Graph Convolution and Operation-Aware Neural Network***. IEEE Transactions on Knowledge and Data Engineering, 2023, 35(4):4178-4189. [Paper](https://ieeexplore.ieee.org/abstract/document/9606527) 

- ```IEEE TNNLS``` Gen Shi, ***Yifan Zhu***, Jian K. Liu, Xuesong Li. ***HeGCL: Advance Self-Supervised Learning in Heterogeneous Graph-level Representation***, IEEE Transactions on Neural Networks and Learning Systems. 2023. [Paper](https://ieeexplore.ieee.org/document/10135109)


- ```WWW 2023``` Dan Zhang, ***Yifan Zhu***, Yuxiao Dong, Yuandong Wang, Wenzheng Feng, Evgeny Kharlamov, Jie Tang. ***ApeGNN: Node-Wise Adaptive Aggregation in GNNs for Recommendation***. In Proceedings of the Web Conference 2023 (WWW'23), 759--769. [Paper](https://dl.acm.org/doi/abs/10.1145/3543507.3583530) [Code](https://github.com/THUDM/ApeGNN)

## 2022

- ```CIKM 2022``` Zepeng Huai, Zhe Wang, ***Yifan Zhu***, Peng Zhang. ***AMinerGNN: Heterogeneous Graph Neural Network for Paper Click-through Rate Prediction with Fusion Query***. In 31st ACM International Conference on Information & Knowledge Management (CIKM'22), 4039-4043. [Paper](https://dl.acm.org/doi/abs/10.1145/3511808.3557544)

- ```BIBM 2022``` Gen Shi, ***Yifan Zhu***, Fuquan Zhang, Wenjin Liu, Yuxiang Yao, Xuesong Li. ***Fusion Learning of Multimodal Neuroimaging with Weighted Graph AutoEncoder***. In proceedings of the International Conference on Bioinformatics and Biomedicine (BIBM'2022), 2467-2473. [Paper](https://ieeexplore.ieee.org/abstract/document/9995243)

- ```SIGIR 2022``` Qika Lin, Jun Liu, Fangzhi Xu, Yudai Pan, ***Yifan Zhu***, Lingling Zhang and Tianzhe Zhao. ***Incorporating Context Graph with Logical Reasoning for Inductive Relation Prediction***. In 45th International ACM SIGIR Conference on Research and Development in Information Retrieval (SIGIR'22), 893-903. [Paper](https://dl.acm.org/doi/10.1145/3477495.3531996)

- ```IEEE TCSS``` Tan Wang, ***Yifan Zhu***, Peijun Ye, Weichao Gong, Hao Lu, Hong Mo, Fei-Yue Wang, ***A New Perspective for Computational Systems:Fuzzy Modeling and Reasoning for Social Computing in CPSS***. IEEE Transactions on Computational Social Systems, 2022. [Paper](https://ieeexplore.ieee.org/abstract/document/9894383)

- ```IEEE TCSS``` Kaize Shi, Hao Lu, ***Yifan Zhu***, Zhendong Niu, ***Application of Social Sensors in Natural Disasters Emergency Management: A Review***. IEEE Transactions on Computational Social Systems, 2022. [Paper](https://ieeexplore.ieee.org/abstract/document/9923419)

- ```IEEE TCSS``` Donglei Liu, Yong Yuan, Rui Qin, ***Yifan Zhu***, Chunxia Zhang, Zhendong Niu, ***A Local Self-Attention Sentence Model for Answer Selection Task in CQA Systems***. IEEE Transactions on Computational Social Systems, 2022. [Paper](https://ieeexplore.ieee.org/abstract/document/9861392)

- ```IEEE TITS``` Hao Lu, ***Yifan Zhu***, Qika Lin, Tan Wang, Zhendong Niu, Enrique Herrera-Viedma. ***Heterogeneous knowledge learning of predictive academic intelligence in transportation***. IEEE Transactions on Intelligent Transportation Systems, 2022, 23(4):3737-3755. [Paper](https://ieeexplore.ieee.org/abstract/document/9298476/)

- ```IEEE TCDS``` Gen Shi, ***Yifan Zhu***, Zhensen Chen, Jinyan Liu, Xuesong Li, ***Are Non-image Data Really Necessary for Disease Prediction with Graph Convolutional Networks?***. IEEE Transactions on Cognitive and Developmental Systems, 2022, 15(1):252-260. [Paper](https://ieeexplore.ieee.org/abstract/document/9717290)

## 2021

- ```IEEE TCDS``` ***Yifan Zhu***, Xuesong Li , Yang Sun, Haixu Wang, Hua Guo, and Jie Sui, ***Investigating Neural Substrates of Individual Independence and Interdependence Orientations via Efficiency-based Dynamic Functional Connectivity: A Machine Learning Approach***. IEEE Transactions on Cognitive and Developmental Systems, 2022, 14(2):761-771. [Paper](https://ieeexplore.ieee.org/abstract/document/9502838)

- ```MIA``` ***Yifan Zhu***, Xuesong Li, Yufei Qiao, Ruihong Shang, Gen Shi, Yingying Shang, and Hua Guo, ***Widespread Plasticity of Cognition-Related Brain Networks in Single-Sided Deafness Revealed by Randomized Window-Based Dynamic Functional Connectivity***. Medical Image Analysis, 2021, 73(474):102163. [Paper](https://www.sciencedirect.com/science/article/abs/pii/S1361841521002097)

- ```KBS``` ***Yifan Zhu***, Qika Lin, Hao Lu, Kaize Shi, Ping Qiu, and Zhendong Niu, ***Recommending scientific paper via heterogeneous knowledge embedding based attentive recurrent neural networks***. Knowledge-Based Systems, 2021, 215: 106744. [Paper](https://www.sciencedirect.com/science/article/abs/pii/S0950705121000071) 

- ```FGCS``` Qika Lin, ***Yifan Zhu***, Hao Lu, Kaize Shi, and Zhendong Niu, ***Improving University Faculty Evaluations via multi-view Knowledge Graph***. Future Generation Computer Systems, 2021, 117:181-192. [Paper](https://www.sciencedirect.com/science/article/abs/pii/S0167739X20330454)

- ```NeuroImage``` Gen Shi, Xuesong Li, ***Yifan Zhu***, Ruihong Shang, Yang Sun, Hua Guo, Jie Sui, ***The divided brain: Functional brain asymmetry underlying self-construal***. NeuroImage, 2021, 240:118382. [Paper](https://www.sciencedirect.com/science/article/pii/S1053811921006583)

- ```IP&M``` Kaize Shi, Yuseng Wang, Hao Lu, ***Yifan Zhu***, Zhendong Niu, ***EKGTF: A knowledge-enhanced model for optimizing social network-based meteorological briefings***. Information Processing & Management, 2021, 58(4):102564. [Paper](https://www.sciencedirect.com/science/article/abs/pii/S0306457321000637)

- ```TCSS``` Hao Lu, ***Yifan Zhu***, Yong Yuan, Weichao Gong, Juanuan Li, Kaize Shi, Yisheng Lv, Zhendong Niu, Fei-Yue Wang, ***Social Signal-Driven Knowledge Automation: A Focus on Social Transportation***. IEEE Transactions on Computational Social Systems, 2021, 8(3): 737-753. [Paper](https://ieeexplore.ieee.org/abstract/document/9374560)

- Yu Mao, ***Yifan Zhu***, Yiping Liu, Qika Lin, Hao Lu, Fuquan Zhang, ***Classifying user connections through social media avatars and users social activities: a case study in identifying sellers on social media***. Enterprise Information Systems, 2021, 16(8-9): 1856420. [Paper](https://www.tandfonline.com/doi/abs/10.1080/17517575.2020.1856420)


## 2020

- ***Yifan Zhu***, Hao Lu, Ping Qiu, Kaize Shi, James Chambua, Zhendong Niu, ***Heterogeneous teaching evaluation network based offline course recommendation with graph learning and tensor factorization***. Neurocomputing 415, 84-95. [Paper](https://www.sciencedirect.com/science/article/abs/pii/S0925231220311723)

- ***Yifan Zhu***, Sifan Zhang, Yinan Li, Hao Lu, Kaize Shi, Zhendong Niu, ***Social weather: A review of crowdsourcing‐assisted meteorological knowledge services through social cyberspace***. Geoscience Data Journal, 2020, 7(1): 61-79. [Paper](https://rmets.onlinelibrary.wiley.com/doi/full/10.1002/gdj3.85)

- ```KBS``` Kaize Shi, Hao Lu, ***Yifan Zhu***, Zhendong Niu, ***Automatic generation of meteorological briefing by event knowledge guided summarization model***. Knowledge-Based Systems, 2020, 192: 105379. [Paper](https://www.sciencedirect.com/science/article/abs/pii/S0950705119306276)

## 2019

- ```ISPA 2019``` Yu Mao, ***Yifan Zhu***, Sifan Zhang, Dexiu Zhang, Fuquan Zhang, Xiaozhong Fan, ***Detecting interest-factor influenced abnormal evaluation of teaching via multimodal embedding and priori knowledge based neural network***. In IEEE-ISPA 2019, 1201-1209. [Paper](https://ieeexplore.ieee.org/abstract/document/9047381)

- ```ISPA 2019``` Yinan Li, Fuquan Zhang, ***Y. Zhu***, S. Zhang, Y. Mao, Z. Niu, ***Chinese Lexical Based Sentiment Analysis Framework in Meteorology***, IEEE-ISPA 2019, 1652-1658. [Paper](https://ieeexplore.ieee.org/abstract/document/9047329)


- ***Yifan Zhu***, James Chambua, Hao Lu, Kaize Shi, Zhendong Niu, ***An opinion based cross‐regional meteorological event detection model***. Weather, 2019, 74(2): 51-55. [Paper](https://rmets.onlinelibrary.wiley.com/doi/abs/10.1002/wea.3295)


- ```FGCS``` Kaize Shi, Changjin Gong, Hao Lu, ***Yifan Zhu***, Zhendong Niu. ***Wide-grained capsule network with sentence-level feature to detect meteorological event in social network***. Future Generation Computer Systems, 2020, 102:323-332. [Paper](https://www.sciencedirect.com/science/article/abs/pii/S0167739X19310908)

- ```ESWA``` James Chambua, Zhendong Niu, ***Yifan Zhu***, ***User preferences prediction approach based on embedded deep summaries***. Expert Systems with Applications, 2019, 132: 87-98. [Paper](https://www.sciencedirect.com/science/article/abs/pii/S0957417419302775)

- Yubing Nie, ***Yifan Zhu***, Qika Lin, Sifan Zhang, Pengfei Shi, Zhendong Niu, ***Academic rising star prediction via scholar’s evaluation model and machine learning techniques***. Scientometrics, 2019, 120(2): 461-476. [Paper](https://link.springer.com/article/10.1007/s11192-019-03131-x)

- Qika Lin, ***Yifan Zhu***, Sifan Zhang, Pengfei Shi, Qing Guo, Zhendong Niu, ***Lexical based automated teaching evaluation via students’ short reviews***. Computer Applications in Engineering Education, 2019, 27(1): 194-205. [Paper](https://onlinelibrary.wiley.com/doi/full/10.1002/cae.22068)


# 🎖 Honors and Awards
<span class='anchor' id='-honors-and-awards'></span>
- *2023.10* Runner-up best paper award (ADS Track), ECML-PKDD 2023.

# 🔍 Educations & Work Experiences

<span class='anchor' id='-educations'></span>

- *2023.09 - (now)*, Assistant professor at School of Computer Science, Beijing University of Posts and Telecommunications, Beijing, China. 
- *2021.10 - 2023.09*, Postdoc research fellow at Department of Computer Science and Technology, Tsinghua University, Beijing, China. (Supervisor: [Prof. Jie Tang](https://keg.cs.tsinghua.edu.cn/jietang/) )
- *2016.09 - 2021.06*, Ph.D. at School of Computer Science and Technology, Beijing Institute of Technology, Beijing, China. (Supervisor: [Prof. Zhendong Niu](https://cs.bit.edu.cn/szdw/jsml/js/nzd/index.htm))
- *2012.09 - 2016.06*, B.E. at Computer School, Beijing Information Science & Technology University, Beijing, China. 

# 🎤 Lecture, Talk, and Services
<span class='anchor' id='-social'></span>

## Invited Talks

- *2023.10*, 基础模型时代下隐私保护与可信数据要素流通, 第一届中国（成都）数智金融高峰论坛 [Slides](files/大模型时代下隐私保护与可信数据要素流通_数智论坛.pdf)

## Editor Service

- *2023.12 - present*, ***Editorial Board Member*** of [Information Fusion](https://www.sciencedirect.com/journal/information-fusion/about/editorial-board)
- *2023.10 - 2024.06*, ***Guest Editor*** of [Electronics](https://www.mdpi.com/journal/electronics/special_issues/D3L8Y3L5S7)
- *2022.03 - 2022.12*, ***Guest Editor*** of [Wireless Communications and Mobile Computing](https://www.hindawi.com/journals/wcmc/si/149297/)
- *2021.10 - 2022.02*, ***Guest Editor*** of [International Journal of Distributed Sensor Networks](https://journals.sagepub.com/page/dsn/collections/special-issues/intelligent-sensing-fusion-and-processing-in-cyber-physical-social-systems)

## Program Committee & Reviewer Service

- ***Program committee member*** of WWW'24, MM'24, AAAI'22-24, IJCAI'23-24, ECML-PKDD'22, ICWSM'24
- ***Reviewer*** of IEEE TOIS, IEEE TMC, IEEE TITS, ACM TKDD, IEEE TNNLS, ACM ToMM, IEEE TBD, IEEE TCSS, IEEE TNSE, IEEE TCDS, IEEE TALLIP, IEEE TLT, ACM TALLIP, IEEE TETCI, Expert System with Applications, Computational Intelligence, Scientometics, Neurocomputing, Network: Computation in Neural Systems, Frontiers of Computer Science.

<!-- # Lectures -->
<!-- # Students -->
