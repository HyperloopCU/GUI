// const states = [
//     {
//         name: 'Startup',
//         automatic: true,
//         subs: [
//             { name: 'Arm', automatic: true },
//             { name: 'Standby', automatic: false }
//         ]
//     },
//     {
//         name: 'Crawl',
//         automatic: true,
//         subs: [
//             {
//                 name: 'Standby',
//                 automatic: false
//             }
//         ]

//     },
//     {
//         name: 'Accelerate',
//         automatic: true,
//         subs: [{ name: 'Coast', automatic: true }, { name: 'Soft Stop', automatic: true }, { name: 'Wait', automatic: true }]

//     }
// ]
const states = [
    {
        name: 'Shutdown',
        automatic: true,
        subs: [
            { name: 'Standby', automatic: false }
        ]
    },
    {
        name: 'Accelerate',
        automatic: true,
        subs: [{ name: 'Coast', automatic: true }]

    },
    {
        name: 'Brake',
        automatic: true,
        subs:[]
    }
]

export default states;