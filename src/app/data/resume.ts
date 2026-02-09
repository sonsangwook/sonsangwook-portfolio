export interface Experience {
    id: string;
    company: string;
    role: string;
    period: string;
    duration: string;
    description: string;
    note?: string;
}

export interface Education {
    id: string;
    school: string;
    degree: string;
    period: string;
}

export interface Skill {
    category: string;
    items: string[];
}

export interface ResumeData {
    name: string;
    role: string;
    introduction: string;
    totalExperience: string;
    contact: {
        email: string;
        phone: string;
        portfolio?: string;
    };
    experiences: Experience[];
    education: Education[];
    skills: Skill[];
}

export const resumeData: ResumeData = {
    name: "손상욱",
    role: "프로덕트 디자이너",
    introduction: `에이전시와 인하우스를 모두 경험하며, 초기 설계부터 운영·고도화까지 전 과정을 거치며 성장해온 프로덕트 디자이너 손상욱입니다.

저는 디자인을 화면을 만드는 일이라기보다, 비즈니스 목표와 사용자 행동 사이의 간극을 구조적으로 메우는 일이라고 생각합니다. 초기 기획 단계에서 문제를 정의하고, 출시 이후에는 운영 데이터와 사용자 반응을 통해 가설을 검증하며, 필요하다면 방향 자체를 다시 설정하는 과정까지 전반을 경험해 왔습니다. 단기적인 개선보다, 제품이 왜 선택되고 왜 반복 사용되는지를 설명할 수 있는 구조를 만드는 데 집중해 왔습니다.

저의 강점은 문제를 빠르게 정의하는 속도보다, 문제를 끝까지 붙잡고 맥락을 잃지 않는 집요함이라고 생각합니다. 눈에 보이는 지표보다 그 지표가 만들어진 배경과 구조를 이해하려 노력하며, 디자인이 팀과 조직의 의사결정에 어떤 영향을 미치는지까지 함께 고민합니다. 그래서 제 작업은 항상 특정 화면이나 기능에 머무르기보다, 제품이 작동하는 방식 전체를 개선하는 방향으로 귀결되어 왔습니다.

그리고 최근에는 AI를 활용해 업무 효율을 구조적으로 개선하는 방법에 관심을 두고 있습니다. 반복적이거나 비효율적인 작업을 어떻게 자동화할 수 있을지 고민하고, 현재의 업무 흐름에 현실적으로 적용 가능한 AI 활용 방식을 실험하고 있습니다. 저는 완벽한 방법을 찾기보다 작게 실행하고 빠르게 개선하는 것이 더 중요하다고 생각합니다. 변화에 빠르게 도입하며 학습하는 과정을 통해, 개인뿐 아니라 팀과 조직의 모든 구성원이 함께 성장할 수 있는 환경에 큰 관심을 가지고 있습니다.

앞으로도 저는 디자인을 통해 사용자의 선택을 돕고, 팀이 더 나은 판단을 할 수 있도록 구조를 만드는 디자이너로 성장하고 싶습니다. 보기 좋은 결과보다, 왜 이 선택이 옳았는지 설명할 수 있는 디자인을 계속 만들어가고자 합니다.`,
    totalExperience: "7년 차",
    contact: {
        email: "sonsuk93@gmail.com",
        phone: "+82 10 3735 4205",
        portfolio: "https://sswook-portfolio.vercel.app/"
    },
    experiences: [
        {
            id: "1",
            company: "노크",
            role: "Product Designer",
            period: "2024.04 - 2025.12",
            duration: "1년 9개월",
            note: "경영 악화로 서비스 종료",
            description: "한국야쿠르트의 자회사로 '노크' 배달플랫폼을 운영했습니다. 무료 배달앱 '노크'의 서비스 전략 수립부터 신규 모델인 '모두배달'의 기획 및 디자인, 운영 전 과정을 주도했습니다. 사용자 니즈 분석을 통해 '신선식품' 중심의 장보기 서비스로 피봇하여 리텐션 39%를 달성했으며, 여러 가게 동시 주문 UX 설계를 통해 유저 재방문율과 주문 수를 각각 개선했습니다. 또한, 사장님 전용 앱과 주문 접수 POS 웹도 담당하며 B2B 영역까지 디자인 영역을 담당했습니다."
        },
        {
            id: "2",
            company: "멋쟁이사자처럼",
            role: "Product Designer",
            period: "2021.05 - 2023.11",
            duration: "2년 7개월",
            description: "'테킷' 플랫폼의 MVP 기획 및 제작, 운영, 고도화를 담당했습니다. 비즈니스 방향성에 따른 기획, 디자인, 운영까지 전 범위의 업무를 담당했으며, 프로젝트별 PM 역할도 수행하여 프로젝트 관리와 타 부서와의 커뮤니케이션을 주도하였습니다."
        },
        {
            id: "3",
            company: "PlusX advanced Lab",
            role: "UI/UX Designer",
            period: "2020.01 - 2021.05",
            duration: "1년 3개월",
            description: "대표 클라이언트 삼성화재의 UX/UI 운영 업무를 메인으로 작업했습니다. 이를 통해 삼성화재의 디자인 시스템을 구축하고 개선하는 업무를 수행했습니다. 또한 회사 자사 브랜드의 제품 촬영 기획 및 디자인 운영을 담당했습니다."
        },
        {
            id: "4",
            company: "아메바",
            role: "UI/UX Designer",
            period: "2018.03 - 2019.03",
            duration: "1년",
            description: "UI 화면 기획, 정책 설계 및 운영 업무 진행, 클라이언트와 커뮤니케이션을 담당했습니다."
        }
    ],
    education: [],
    skills: [
        {
            category: "Design",
            items: ["Figma", "Photoshop", "Illustrator", "Prototype"]
        },
        {
            category: "Data",
            items: ["SQL(AI)", "Hackle", "GA", "Databricks", "Beusable"]
        }
    ]
};
