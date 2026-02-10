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
            description: "한국야쿠르트의 자회사에서 운영하던 무료 배달 플랫폼 '노크'의 제품 방향 설정과 구조 설계를 주도했습니다.\n비즈니스 목표를 기준으로 사용자와 가맹점의 니즈를 분석해 해결해야 할 문제를 정의하고, 이를 바탕으로 기존 서비스\n확장을 위한 신규 모델의 기획·UX/UI 디자인·운영 개선을 이끌었습니다.\n\n사용자 행동 데이터를 기반으로 '신선식품 중심의 장보기'를 핵심 가치로 구체화해 리텐션 39%를 달성했으며,\n여러 가게를 동시에 주문하는 UX를 설계해 재방문율과 주문 수를 개선했습니다. 또한 사장님 전용 앱과 POS 웹까지\n범위를 확장해 운영 효율과 내부 프로세스 개선까지 연결했습니다."
        },
        {
            id: "2",
            company: "멋쟁이사자처럼",
            role: "Product Designer",
            period: "2021.05 - 2023.11",
            duration: "2년 7개월",
            description: "멋쟁이사자처럼에서 교육 플랫폼 (구 Techit)의 MVP 출시를 목표로 UX/UI 디자인과 제품 구조 설계를 주도했습니다.\n비즈니스 및 교육 목표를 기준으로 플랫폼의 핵심 가치와 사용자 경험의 방향을 정의하고, 제한된 리소스 안에서 MVP가 빠르게 출시될 수 있도록 디자인 전반을 책임졌습니다.\n\nMVP 출시 이후에는 운영 데이터와 사용자 피드백을 바탕으로 주요 기능과 정보 구조를 지속적으로 개선하며,\n학습 경험의 일관성과 확장성을 기준으로 고도화를 진행했습니다. 이 과정에서 플랫폼 내 수강생 모집 성과 1위를\n달성하며, 디자인이 실제 비즈니스 성과로 이어지는 경험을 만들었습니다."
        },
        {
            id: "3",
            company: "PlusX advanced Lab",
            role: "UI/UX Designer",
            period: "2020.01 - 2021.05",
            duration: "1년 3개월",
            description: "대표 클라이언트인 삼성화재의 UX/UI 운영 업무를 메인으로 담당했습니다. 서비스 전반의 UI 품질을 안정적으로\n유지·개선하는 과정에서, 삼성화재 디자인 시스템의 구축 및 고도화 작업에 참여하며 컴포넌트 정리와 사용성 개선을\n수행했습니다.\n또한 클라이언트 프로젝트와 병행하여 자사 브랜드 제품 촬영 기획부터 디자인 운영을 담당하며, 브랜드 톤앤매너를\n유지한 시각적 결과물을 제작했습니다. 다양한 이해관계자와 협업하며 일정과 품질을 동시에 고려한 디자인 운영\n경험을 쌓았습니다."
        },
        {
            id: "4",
            company: "아메바",
            role: "UI/UX Designer",
            period: "2018.03 - 2019.03",
            duration: "1년",
            description: "UI 화면 기획과 정책 설계, 운영 업무를 담당하며 서비스 전반의 UX 품질을 관리했습니다. 운영 과정에서 변경되는 요구사항을 정리해 디자인 관점에서 구조화했고, 클라이언트와의 지속적인 커뮤니케이션을 통해 정책과 화면 간의 완성도를 유지했습니다."
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
