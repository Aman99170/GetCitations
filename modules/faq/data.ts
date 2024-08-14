export const faqData: IFaqData[]= [
    {
        panel: '1',
        question: 'What is GetCitations?',
        answer: 'We are a platform dedicated to the humble UXer, providing a space to learn, network and collaborate. Our goal is to support UXers throughout their career, providing opportunities for professional and personal growth. Our platform is inclusive and accessible for all levels of UXers to practise and master UX design.',
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