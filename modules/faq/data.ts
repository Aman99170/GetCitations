export const faqData: IFaqData[]= [
    {
        panel: '1',
        question: 'What is GetCitations?',
        answer: 'GetCitations is a platform that connects researchers and freelancers to facilitate the process of obtaining citations for research papers. Researchers can post their papers and request citations, while freelancers can browse these papers, place bids, and provide citation services.',
    },
    {
        panel: '2',
        question: 'What payment options are available?',
        answer: 'We support all major credit cards and PayPal.',
    },
    {
        panel: '3',
        question: 'What languages do you support?',
        answer: 'We support only English at the moment. Support for other languages is on our roadmap. Please join our newsletter to get notified once we release it.',
    },
    {
        panel: '4',
        question: 'Is confidentiality assured?',
        answer: 'Yes, we restrict access strictly on a need to know basis. We also take a number of measures to ensure that your data remains secure. We absolutely do not sell or share your data with any third parties',
    },
    {
        panel: '5',
        question: 'What are your business days?',
        answer: 'Our transcribers work 24x7. Live chat, phone and email support is available on the weekdays and only email support is available on the weekends.',
    },
]

export const doubtData: IDoubtData[] = [
    {imgsrc:"/assets/icons/msg1.svg",title:"Can't find your answer",subtitle:"We want to answer all of your queries. Get in touch and as we'll get back to you as soon as possible."},
    {imgsrc:"/assets/icons/cal.svg",title:"Technical Issue",subtitle:"Have some technical issues? File a bug report or contact our technical team "}
]

export interface IFaqData{
    panel:string
    question:string
    answer:string
}

export interface IDoubtData{
    imgsrc:string
    title:string
    subtitle:string
}