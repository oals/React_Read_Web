# 💻 ReadX
<img src="https://github.com/user-attachments/assets/b4e386cf-b29e-4854-b1e7-e94c3b4a372f" width="300"/>


## 📝 소개

**ReadX**는 사용자가 문서를 업로드하면 **RAG(Retrieval-Augmented Generation)** 기법을 활용해 문서 내에서 <br>
필요한 정보를 찾아내고 이를 **참고하여 보다 명확한 답변**을 생성하는 서비스입니다.

---

# 🔍 RAG(Retrieval-Augmented Generation)

<img src="https://github.com/user-attachments/assets/d603263f-0529-4ca6-90ea-aec3ccafd263" width="900"/>

<br>

## 🤖 RAG(Retrieval-Augmented Generation)란?

**RAG**는 질문에 답하거나 텍스트를 생성할 때, 외부 지식 기반에서 관련 정보를  
**검색(Retrieval)** 한 후, 그 정보를 활용해 **텍스트를 생성(Generation)** 하는 AI 기법입니다.

---

### 🔍 검색 단계
- 문서와 질문을 **벡터(embedding)** 형태로 변환한 후, **코사인 유사도(Cosine Similarity)** 를 사용해 <br> 의미적으로 가장 유사한 정보를 찾아냅니다.

---

### 🧠 생성 단계
- 검색된 문서를 참고하여 **LLM**이 자연스러운 응답을 생성합니다.
- 이로 인해 기존 언어 모델보다 **더 정확하고 신뢰성 있는 응답**을 제공할 수 있습니다.

---

### 🚀 활용 장점
- **최신 정보나 도메인 지식**을 반영할 수 있어 정보 기반 시스템에 매우 효과적입니다.
- 활용 분야:
  - 💬 **챗봇**
  - 📄 **문서 요약**
  - ❓ **지식 기반 Q&A 시스템**

---

### 📌 요약
검색과 생성을 결합한 이 방식은  
**지능형 응답 시스템 구축**의 핵심 기술로 주목받고 있습니다.


---
## 🛠️ 사용 기술 

> **프로그래밍 언어**: Java 17 <br><br>
> **프론트엔드**: React  <br><br>
> **백엔드**: Spring Boot 3.3.13<br><br>
> **AI 모델**: text-embedding-3-small, gpt-3.5-turbo <br><br>
> **캐싱**: Redis  <br><br>

---

## 🔄 전체 프로세스


### 1. 문서 업로드
- 사용자가 문서를 업로드하면 문서의 텍스트를 추출합니다.  

---

### 2. 텍스트 청크 및 벡터화
- 추출된 텍스트를 700자 단위로 나누어 여러 개의 **청크(chunk)** 로 분리합니다.  
- 각 청크를 ChatGPT를 통해 **임베딩(벡터화)** 합니다.
- 생성된 벡터는 **Redis DB**에 저장되며, 저장된 벡터에는 **TTL(Time-To-Live)** 이 설정되어, **24시간 후 자동 삭제**됩니다.  

---

### 3. 사용자 프롬프트 입력
- 사용자가 자연어로 질문이나 요청을 입력합니다.  

---

### 4. 벡터 기반 검색
- 입력된 사용자의 질문을 ChatGPT를 통해 **임베딩(벡터화)** 합니다.  
- Redis에 저장된 벡터들과 **코사인 유사도**를 비교하여 의미적으로 가장 유사한 상위 3개의 문서 청크를 찾아냅니다.

---

### 5. LLM 답변 생성
- 상위 3개의 문서 청크를 **ChatGPT**가 참고하게 하여 정확하고 문맥에 맞는 답변을 생성합니다.

---

### 6. 최종 출력 제공
- 생성된 답변을 사용자에게 반환합니다.  


---


# 📄 문서 업로드

<img src="https://github.com/user-attachments/assets/bb50a8bd-be83-41a2-9c9a-62112c85374b" width="900"/>


<br>

## 📄 문서 업로드 프로세스

| 단계 | 설명 |
|------|------|
| **1. 문서 업로드 요청** | 사용자가 문서를 선택하여 업로드합니다. |
| **2. 텍스트 추출** | 해당 문서에서 **텍스트를 추출**합니다. |
| **3. 청크 분할** | 추출된 텍스트를 700자 단위로 나누어 **여러 개의 청크로 분할**합니다. |
| **4. 청크 벡터화** | 각 청크를 ChatGPT를 통해 **임베딩(벡터화)** 합니다. |
| **5. Redis 저장** | 벡터화된 데이터를 Redis에 저장합니다. |
| **6. Key ID 반환** | 저장된 데이터에 접근할 수 있도록 **고유 식별자**를 생성하여 반환합니다. |


<br>

---


## 📦 Redis 저장 구조

<details>
<summary>벡터 청크</summary>

<img width="900" src="https://github.com/user-attachments/assets/bc7d6145-ca85-4c4e-87c3-574acbae2667" />

</details>

---

<details>
<summary>텍스트 청크</summary>

<img width="900" src="https://github.com/user-attachments/assets/56f67436-9e13-4766-90f9-9f8f7a6ea10a" />

</details>

---


# 🤖 RAG 기반 질문

<img src="https://github.com/user-attachments/assets/bad3f136-8b80-439e-a43d-1bd6d1868026" width="900"/>

## 🤖 RAG 기반 질문 프로세스

| 단계 | 설명 |
|------|------|
| **1. 사용자 질문 입력** | 사용자가 질문을 입력합니다. |
| **2. 질문 벡터화** | 입력된 질문을 ChatGPT를 통해 **임베딩(벡터화)** 합니다. |
| **3. 벡터 유사도 검색** | Redis에 저장된 문서 벡터들과 비교하여 **유사도가 높은 상위 3개의 청크**를 검색합니다. |
| **4. 관련 텍스트 청크 조회** | 검색된 청크들의 **원문 텍스트**를 Redis에서 불러옵니다. |
| **5. ChatGPT에 질문** | **원문 텍스트**와 사용자의 질문을 **ChatGPT**에 전달합니다. |
| **6. 답변 생성** | ChatGPT가 **원문 텍스트를 참고**해 질문에 대한 답변을 생성하고 사용자에게 제공합니다. |


---

<br>

##  🧐 답변과 문서 비교

<br>

| 항목 | 이미지 |
|------|--------|
|  **답변** | <img src="https://github.com/user-attachments/assets/2735c31b-811b-4448-943f-46945da3cf17" width="720" /> |
|  **문서** | <img src="https://github.com/user-attachments/assets/0beb035a-c5b6-4f23-a403-85cbd842b01e" /> |

<br>
<br>


| 항목 | 이미지 |
|------|--------|
|  **답변** | <img src="https://github.com/user-attachments/assets/ec26ff5d-f2d7-47d1-b9e0-0f6d44671f01" width="720"/> |
|  **문서** | <img src="https://github.com/user-attachments/assets/cdf3638c-2c24-4b70-985a-37457da33128"/> |

<br>
<br>


| 항목 | 이미지 |
|------|--------|
|  **답변** | <img src="https://github.com/user-attachments/assets/03ef1fc8-61e3-4444-8c55-fbca6b880b0c" width="720"/> |
|  **문서** | <img src="https://github.com/user-attachments/assets/5c9777e3-a1ea-4e05-84e5-37717bafcf62"/> |


<br>



