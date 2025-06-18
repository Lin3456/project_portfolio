const profile = {
	info: {
    name: '林柔妤',
		title: '前端工程師',
    contact: {
      email: 'lry.0000.mail@gmail.com',
			phone: '0936-135-062',
    },
    summary: '以業務邏輯為核心的前端開發者'
  },
	skills: {
		frontEnd: [
			{
				label: 'Vue.js',
				tooltip: '前端框架，提升開發效率與維護性',
			},
			{
				label: 'Bootstrap',
				tooltip: '前端 UI 框架，提供響應式設計與元件',
			},
			{
				label: 'Pinia',
				tooltip: 'Vue 生態系的狀態管理工具，取代 Vuex',
			},
			{
				label: 'Vuex',
				tooltip: '舊版Vue 常用的狀態管理工具',
			},
			{
				label: 'CSS',
				tooltip: '網頁樣式設計語言，用於排版與美化',
			},
			{
				label: 'JavaScript(ES6+)',
				tooltip: 'JavaScript 現代語法版本',
			},
		],
		backEnd: [
			{
				label: 'Node.js',
				tooltip: '使用 JavaScript 撰寫後端服務的執行環境',
			},
			{
				label: 'JavaScript(後端開發)',
				tooltip: '以 JavaScript 開發 API 與伺服器邏輯',
			},
			{
				label: 'Sequelize',
				tooltip: 'Node.js 的 ORM 工具，用於操作資料庫',
			},
			{
				label: 'MariaDB',
				tooltip: '關聯式資料庫',
			},
		]
	},
	experience: [
		{
			company: '顯榮國際股份有限公司',
			position: '委外程式開發助理 | 派駐中華資安科技股份有限公司',
			time: '2021.06 - 2023.08',
			description: '',
			porject: [
				{
					name: 'SRM 資安風險管理平台(Security Risk Management)',
					introduction: '企業資安平台，整合資產弱點、通報與修補追蹤等機制',
					curSituation: '',
					job: '1. 負責既有系統功能維護與小型模組開發\n 2. 優化部分使用者介面，改善查詢與表單操作體驗',
					skills: {
						frontEnd: ['Vue 2', 'View UI', 'axios', 'CSS']
					},
					result: '協助系統穩定營運，並依據需求持續擴充功能與優化使用體驗'
				}
			]
		},
		{
			company: '康和綜合證券股份有限公司',
			position: '全端工程師 | 正職',
			time: '2023.08 - 2025.06',
			description: '參與公司 COBOL 舊系統現在化重構專案，負責桌面應用與Web系統的前後端開發，提升操作體驗與維護彈性。\n具備從資料規劃、API設計、前端UI 建置到資料庫查詢邏輯整合的實務經驗',
			porject: [
				{
					name: '國內外帳務管理系統(Electron 桌面應用)',
					introduction: 'COBOL 舊有帳務系統改寫為桌面應用程式，供各部門查詢帳務資料、生成報表等。',
					curSituation: '國外模組:已於2025年1月 全面上線。\n國內模組:目前已上線部分查詢與報表功能，但因應長官策略調整，暫停開發',
					job: '使用VUE 3 + Electron開發多夜市查詢介面、資料檢索與匯出報表功能\n建立跨業元件模組，提升元件重用性與維護效率\n使用Node.js + JavaScript 撰寫API，整合Sequelize與MariaDB，負責帳務資料查詢與轉換業務邏輯',
					skills: {
						frontEnd: ['Electron', 'Vue 3', 'Vuex', 'Bootstrap4', 'axios', 'CSS'],
						backEnd: ['Node.js', 'JavaScript', 'MariaDB'],
					},
				},
				{
					name: '分戶帳2.0 (Web 應用 | 開發中)',
					introduction: '為 COBOL 系統現在化重構的專案，從零開發 Web 化分戶帳管理系統，並參與初期資料結構設計與規劃',
					curSituation: '已完成查詢、維運介面 等部分功能，持續開發中',
					job: '從系統規劃初期即參與資料結構設計、功能規劃與撰寫規格書 等\n使用 Vue 3 + Bootstrap5 開發 SPA前端介面\n 使用Node.js + JavaScript 撰寫 API，使用Sequelize連接 MariaDB，負責資料查詢、錯誤處理與格式驗證',
					skills: {
						frontEnd: ['Vue 3', 'Pina', 'Bootstrap5', 'axios', 'CSS'],
						backEnd: ['Node.js', 'JavaScript', 'MariaDB'],
					},
				}
			]
		},
	],
	education: [
		{
			department: '資訊管理系',
			school: '致理科技大學	',
			year: '2017 - 2020'
		}
	]
}

export default profile;