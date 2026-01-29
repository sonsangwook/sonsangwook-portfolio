export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    tags: string[];
    thumbnail: string;
    category?: string;
    background: string;
    problem: string;
    solution: string;
    result: string;
    year?: string;
    company?: string;
    roleDetails?: string;
    projectResult?: string;
    images?: {
        hero1?: string;
        heroes?: string[];
        hero2?: string;
        background?: string;
        backgroundImages?: string[];
        problem?: string[];
        solution?: string[];
        result?: string[];
    };
    designDetails?: {
        title: string;
        description: string;
        images?: string[];
    }[];
}

export const projects: Project[] = [
    {
        id: "1",
        slug: "fresh-food-retention",
        title: "지역 기반 신선식품 배달 서비스",
        description: `무료배달 경쟁 심화로 인해 노크의 주문 수는 42.5% 감소하고 리텐션 또한 35% 하락하는 상황에서, 기존 배달앱 구조만으로는 서비스 지속이 어렵다고 판단했습니다.\n데이터 분석과 유저 인터뷰를 통해 신선식품 온라인 구매의 핵심 장애 요인이 ‘가격’이 아닌 ‘상품 상태에 대한 신뢰 부족’임을 정의했으며, 온라인 전환율이 16.8%에 불과한 신선식품 영역에서 새로운 PMF 가능성을 확인했습니다.\n이에 매일 직접 촬영한 실물 이미지, 이미지 중심 리뷰 UX, 여러 가게를 한 번에 주문할 수 있는 장보기 구조를 설계했고, 그 결과 상품 클릭률과 구매 전환율이 상승하며 4주차 리텐션 39%와 주차별 주문 수 평균 32% 성장을 달성했습니다.`,
        tags: ["E-Commerce", "Fresh food", "MVP"],
        thumbnail: "/images/project-thumb-1.png",
        category: "E-Commerce",
        year: "2025",
        company: "노크",
        roleDetails: "Design 90%, PM 70%",
        projectResult: "노크 Mobile App (B2C), 사장님 전용 앱 + 주문접수 (B2B)",
        images: {
            hero1: "/images/p1-hero.jpg",
            heroes: [
                "/images/p1-hero.jpg"
            ],
            backgroundImages: [
                "/images/p1-00.jpg",
                "/images/p1-01.jpg"
            ],
            problem: [
                "/images/p1-02.jpg"
            ],
            solution: [],
            result: [
                "/images/p1-07.jpg",
                "/images/p1-08.jpg"
            ]
        },
        designDetails: [
            {
                title: "매일 직접 촬영한 실물 이미지로 ‘신선도 신뢰’ 구축",
                description: `온라인 신선식품 구매에서 가장 큰 불안 요소는 상품을 받기 전까지 상태를 알 수 없다는 점이라고 판단했습니다.\n유저 인터뷰 결과, 기존 상품 이미지가 실제와 다르다는 경험이 반복되며 온라인 구매 자체를 회피하는 경향이 나타났습니다.\n이에 가게별로 매일 직접 촬영한 실물 이미지를 상품 탐색 단계와 상세 페이지 전반에 노출하고, ‘최근’이 아닌 ‘오늘 촬영’이라는 시간성을 명확히 강조하는 UI를 설계했습니다.\n그 결과 기존 상품 대비 상품 클릭률이 8.5%p, 구매 전환율이 1.81%p 상승하며 이미지 신뢰도가 실제 구매 행동으로 이어짐을 확인했습니다.`,
                images: [
                    "/images/p1-03.jpg"
                ]
            },
            {
                title: "여러 가게를 한 번에 주문하는 ‘모두배달’로 장보기 경험 단순화",
                description: `오프라인 장보기의 불편함은 여러 가게를 직접 이동해야 한다는 점이며, 온라인에서는 이를 해결하지 못한 채 가게 단위 주문 구조를 유지하고 있었습니다.\n유저 인터뷰를 통해 장보기 시 평균 2.3개의 매장을 방문한다는 점에 주목했고, 온라인에서도 이를 한 번의 주문으로 해결할 수 있어야 한다고 판단했습니다.\n이에 여러 가게를 배송비 없이 한 번에 주문할 수 있는 ‘모두배달’ 구조를 설계하고, 장바구니·결제 단계에서 해당 가치를 자연스럽게 인지하도록 UX를 재구성했습니다.\n그 결과 모두배달을 경험한 유저의 W4 리텐션이 미경험 유저 대비 1.24배 높게 나타났으며, 장보기 영역의 반복 사용 가능성을 검증할 수 있었습니다.`,
                images: [
                    "/images/p1-04.jpg"
                ]
            },
            {
                title: "이미지 중심 리뷰 UX로 구매 결정에 필요한 정보 강화",
                description: `데이터 분석 결과, 리뷰 페이지 진입률은 낮았지만 리뷰를 확인한 유저의 구매 전환율은 59%로 매우 높게 나타났습니다.\n특히 사진 리뷰가 전체 리뷰의 31%를 차지하고 있었으며, 이는 신선식품 구매 결정에 있어 텍스트보다 이미지가 더 중요한 판단 기준임을 의미했습니다.\n이에 리뷰 영역을 이미지 중심으로 재설계하고, 상품 상세 페이지 내에서 다른 유저의 실물 리뷰 이미지를 적극 노출하는 방식으로 신뢰 정보를 강화했습니다.\n그 결과 리뷰 페이지 클릭률과 구매 전환율이 동시에 상승했으며, 리뷰 작성자의 평균 재구매 횟수는 1.7배, 평균 구매액은 3.9배 증가하는 성과를 확인했습니다.`,
                images: [
                    "/images/p1-05.jpg"
                ]
            }
        ],
        background: `무료배달 경쟁 심화로 인해 노크의 주문 수는 -42.5%, 리텐션은 -35% 하락하며 기존 배달앱 구조만으로는 생존이 어려운 상황이었다. 반면 온라인 장보기 시장 중 **신선식품의 온라인 전환율은 16.8%**에 불과해, 신뢰 문제를 해결할 경우 새로운 PMF 기회가 존재함을 데이터로 확인했다.`,
        problem: `유저 인터뷰(20명) 결과, 신선식품 온라인 구매의 최대 장애 요인은 **‘상품 상태를 직접 확인할 수 없다는 불신’**이었으며, 실제로 온라인 상품 이미지와 실물 간 불일치 경험이 가장 큰 불만 요소로 나타났다. 이는 구매 전환과 재구매를 동시에 저해하고 있었다.`,
        solution: `온라인에서도 오프라인처럼 ‘직접 보고 고르는 경험’을 제공하기 위해\n1. 가게별 상품을 매일 직접 촬영한 사진을 핵심 신뢰 요소로 노출,\n2. 이미지 중심 리뷰 UX 재설계,\n3. 여러 가게를 한 번에 주문할 수 있는 ‘모두배달’ 구조를 통해 장보기의 번거로움을 제거했다. 모든 기능은 A/B 테스트를 통해 단계적으로 검증하며 확장했다.`,
        result: `• 당일 촬영 상품 적용 시 상품 클릭률 +8.5%p, 구매 전환율 +1.81%p 상승\n• 모두배달 경험 유저의 W4 리텐션 1.24배 증가\n• 서비스 피봇 이후 주차별 주문 수 평균 32% 성장, 4주차 리텐션 39% 달성\n→ 신뢰와 편의성 개선을 통해 장보기 영역에서의 PMF를 검증했다.`
    },
    {
        id: "2",
        slug: "ecommerce-dashboard",
        title: "새로운 배달 경험 '모두배달'",
        description: `무료배달이 업계 전반으로 확산되며 노크의 차별성이 약화되었고, 유저 인터뷰와 설문 분석 결과 불만의 핵심이 ‘최소주문금액으로 인해 원하는 식사 구성을 할 수 없는 경험’에 있음을 확인했습니다.\n유저는 최소주문금액을 맞추기 위해 평균 37% 추가 지출을 하고 있었으며, 이는 가격 문제가 아닌 경험 구조의 문제라고 판단했습니다.\n노크의 상점 밀집도와 라스트마일 통제 역량을 기반으로 여러 가게를 한 번에 주문하는 ‘모두배달’ UX를 퍼널 전반에 걸쳐 설계했고, 반복적인 A/B 테스트를 통해 인지를 강화한 결과 전체 주문 중 모두배달 비중 16%를 달성하고 해당 유저의 W4 리텐션이 일반 주문 대비 22%p 높게 나타났습니다.`,
        tags: ["E-Commerce", "Delivery food"],
        thumbnail: "/images/projects/2/hero.jpg",
        category: "SaaS",
        roleDetails: "Design 100%, PM 40%",
        images: {
            hero1: "/images/projects/2/hero.jpg",
            heroes: ["/images/projects/2/hero.jpg"],
            backgroundImages: ["/images/projects/2/p1-01.jpg"],
            problem: ["/images/projects/2/p1-02.jpg"],
            solution: []
        },
        background: "Sellers on the platform lacked actionable insights into their sales performance and inventory status. The existing dashboard was cluttered and difficult to navigate.",
        problem: "Users were spending too much time exporting data to Excel to analyze their performance. Key metrics were buried under layers of navigation.",
        solution: `Designed a new dashboard with customizable widgets, real-time data visualization, and AI-powered insights. Simplified the navigation structure to surface key actions.`,
        designDetails: [
            {
                title: "Customizable Widgets",
                description: "Drag-and-drop interface for personalized metrics allow sellers to arrange their most important metrics at the top.",
                images: ["/images/projects/2/p1-04.jpg"]
            },
            {
                title: "Real-time Data Visualization",
                description: "Implemented high-performance charts that handle thousands of data points without lag, easing the analysis burden on sellers.",
                images: ["/images/projects/2/p1-03.jpg"]
            },
            {
                title: "AI Insights",
                description: "Predictive anomaly detection helps sellers identify issues before they impact revenue.",
                images: []
            }
        ],
        result: "Reduced time-to-insight by 60%. Seller satisfaction score increased from 3.2 to 4.5/5. Daily active users for the analytics module increased by 45%."
    },
    {
        id: "3",
        slug: "healthcare-booking-system",
        title: "클래스 지원서 개선",
        description: `클래스 매출의 핵심 병목이 지원서 작성 단계에 있으며, 특히 모바일 환경에서의 높은 이탈이 수강생 감소로 직결되고 있음을 데이터로 확인했습니다.\n지원자는 특정 화면이 아닌 지원 시작 이후 여러 단계에서 누적 이탈하고 있었고, 첫 화면에서만 64% 이탈이 발생하는 구조적 문제가 존재했습니다.\n이에 지원서 단계를 8단계에서 4단계로 축소하고, 모바일–PC 이어쓰기 흐름과 클래스별 지원서 커스터마이징이 가능한 어드민을 설계했으며, 그 결과 지원서 완료율이 10.8%p 상승하고 지원자 수가 34% 증가하며 연 매출 기준 약 3.2%의 성과 기여를 만들었습니다.`,
        tags: ["Education", "Application form"],
        thumbnail: "/images/projects/3/hero image.jpg",
        category: "Healthcare",
        year: "2023",
        company: "멋쟁이사자처럼",
        roleDetails: "Design 100%, PM 90%",
        projectResult: "반응형 웹,앱, 어드민",
        images: {
            hero1: "/images/projects/3/hero image.jpg",
            heroes: ["/images/projects/3/hero image.jpg"],
            backgroundImages: [
                "/images/projects/3/p1-01.jpg",
                "/images/projects/3/p1-02.jpg"
            ],
            problem: [],
            solution: [],
            result: [
                "/images/projects/3/p1-03.jpg",
                "/images/projects/3/p1-09.jpg",
                "/images/projects/3/p1-10.jpg"
            ]
        },
        designDetails: [
            {
                title: "Design Solution 1",
                description: "Description for design solution 1",
                images: ["/images/projects/3/p1-04.jpg"]
            },
            {
                title: "Design Solution 2",
                description: "Description for design solution 2",
                images: ["/images/projects/3/p1-05.jpg"]
            },
            {
                title: "Design Solution 3",
                description: "Description for design solution 3",
                images: ["/images/projects/3/p1-06.jpg"]
            }
        ],
        background: "Patients experienced long wait times and confusion when booking appointments. The manual scheduling system led to errors and double bookings.",
        problem: "High no-show rates due to lack of reminders. Patients couldn't easily find doctors with availability that matched their schedule.",
        solution: "Developed a mobile-first booking system with real-time availability, automated reminders, and easy rescheduling. Integrated with the hospital's EMR system.",
        result: "No-show rates decreased by 30%. Patient booking satisfaction increased by 40%. Administrative staff workload related to scheduling reduced by 50%."
    },
];
