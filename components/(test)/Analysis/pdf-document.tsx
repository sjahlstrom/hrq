// import React from 'react'
// import {
//     Document,
//     Page,
//     Text,
//     View,
//     StyleSheet,
//     Image,
// } from '@react-pdf/renderer'
//
// interface Scale {
//     number: number
//     name: string
// }
//
// interface ChartData {
//     scale: string
//     score: number
//     statement: string
// }
//
// interface ScoreClassification {
//     total: string
//     percentile: string
//     rq: string
//     classification: string
// }
//
// interface PDFDocumentProps {
//     lieAnalysis: string
//     totalSummedValues: number
//     chartData: ChartData[]
//     scales: Scale[][]
//     chartImages: string[]
// }
//
// const styles = StyleSheet.create({
//     page: {
//         flexDirection: 'column',
//         backgroundColor: '#FFFFFF',
//         padding: 30,
//         fontFamily: 'Helvetica',
//     },
//     section: { marginBottom: 20 },
//     header: {
//         fontSize: 24,
//         fontFamily: 'Helvetica-Bold',
//         marginBottom: 20,
//         color: '#1F2937',
//     },
//     subHeader: {
//         fontSize: 18,
//         fontFamily: 'Helvetica-Bold',
//         marginBottom: 10,
//         color: '#374151',
//     },
//     text: {
//         fontSize: 12,
//         lineHeight: 1.5,
//         color: '#4B5563',
//         marginBottom: 10
//     },
//     card: {
//         backgroundColor: '#F9FAFB',
//         borderRadius: 8,
//         padding: 15,
//         marginBottom: 15,
//         borderWidth: 1,
//         borderColor: '#E5E7EB',
//     },
//     chartContainer: { marginVertical: 10 },
//     chart: { width: '100%', height: 200, marginBottom: 10 },
//     scoreTable: { marginVertical: 20 },
//     tableRow: {
//         flexDirection: 'row',
//         borderBottomWidth: 1,
//         borderBottomColor: '#E5E7EB',
//         paddingVertical: 8,
//     },
//     tableHeader: {
//         backgroundColor: '#F3F4F6',
//         fontFamily: 'Helvetica-Bold'
//     },
//     tableCell: {
//         flex: 1,
//         padding: 8,
//         fontSize: 10
//     },
//     tableCellHeader: {
//         flex: 1,
//         padding: 8,
//         fontSize: 10,
//         fontFamily: 'Helvetica-Bold',
//     },
//     footer: {
//         position: 'absolute',
//         bottom: 30,
//         left: 30,
//         right: 30,
//         textAlign: 'center',
//         color: '#6B7280',
//         fontSize: 10,
//     },
//     pageNumber: {
//         position: 'absolute',
//         bottom: 30,
//         right: 30,
//         fontSize: 10,
//         color: '#6B7280',
//     },
//     nextSteps: {
//         marginTop: 20,
//         padding: 20,
//         backgroundColor: '#F9FAFB',
//         borderRadius: 8,
//         borderWidth: 1,
//         borderColor: '#E5E7EB',
//     },
//     nextStepsTitle: {
//         fontSize: 20,
//         fontFamily: 'Helvetica-Bold',
//         color: '#1F2937',
//         marginBottom: 12,
//     },
//     nextStepsSubtext: {
//         fontSize: 12,
//         color: '#4B5563',
//         marginBottom: 16,
//     },
//     nextStepsList: {
//         marginLeft: 15,
//     },
//     nextStepsListItem: {
//         fontSize: 12,
//         color: '#4B5563',
//         marginBottom: 8,
//         flexDirection: 'row',
//     },
//     nextStepsListBullet: {
//         width: 10,
//         marginRight: 5,
//     },
//     nextStepsScoreHighlight: {
//         fontSize: 12,
//         fontFamily: 'Helvetica-Bold',
//         color: '#1F2937',
//         marginBottom: 8,
//     },
// })
//
// const scoreClassificationData: ScoreClassification[] = [
//     {
//         total: '>= 1501.0',
//         percentile: '98th and above',
//         rq: '130 and above',
//         classification: 'Very Superior',
//     },
//     {
//         total: '1416 to 1500.5',
//         percentile: '91 to 97',
//         rq: '120-129',
//         classification: 'Superior',
//     },
//     {
//         total: '1314 to 1415.5',
//         percentile: '75 to 90',
//         rq: '110-119',
//         classification: 'High Average',
//     },
//     {
//         total: '1152 to 1313.5',
//         percentile: '25 to 74',
//         rq: '90-109',
//         classification: 'Average',
//     },
//     {
//         total: '1027 to 1151.5',
//         percentile: '9 to 24',
//         rq: '80-89',
//         classification: 'Low Average',
//     },
//     {
//         total: '903.5 to 1026.5',
//         percentile: '2 to 8',
//         rq: '70-79',
//         classification: 'Borderline',
//     },
//     {
//         total: '<= 903',
//         percentile: '1.98 and below',
//         rq: '69 and below',
//         classification: 'Inferior',
//     },
// ]
//
// const ScoreClassificationTable = ({
//                                       data,
//                                   }: {
//     data: ScoreClassification[]
// }) => (
//     <>
//         <View style={[styles.tableRow, styles.tableHeader]}>
//             <Text style={styles.tableCell}>Total (Composite) Scores</Text>
//             <Text style={styles.tableCell}>Percentile</Text>
//             <Text style={styles.tableCell}>RQ</Text>
//             <Text style={styles.tableCell}>Classification</Text>
//         </View>
//         {data.map((item, index) => (
//             <View key={index} style={styles.tableRow}>
//                 <Text style={styles.tableCell}>{item.total}</Text>
//                 <Text style={styles.tableCell}>{item.percentile}</Text>
//                 <Text style={styles.tableCell}>{item.rq}</Text>
//                 <Text style={styles.tableCell}>{item.classification}</Text>
//             </View>
//         ))}
//     </>
// )
//
// const ChunkTable = ({ data }: { data: ChartData[] }) => (
//     <>
//         <View style={[styles.tableRow, styles.tableHeader]}>
//             <Text style={styles.tableCell}>Scale</Text>
//             <Text style={styles.tableCell}>Score</Text>
//             <Text style={styles.tableCell}>Statement</Text>
//         </View>
//         {data.map((item, index) => (
//             <View key={index} style={styles.tableRow}>
//                 <Text style={styles.tableCell}>{item.scale}</Text>
//                 <Text style={styles.tableCell}>{item.score.toFixed(1)}</Text>
//                 <Text style={styles.tableCell}>{item.statement}</Text>
//             </View>
//         ))}
//     </>
// )
//
// const PDFDocument: React.FC<PDFDocumentProps> = ({
//                                                      lieAnalysis,
//                                                      totalSummedValues,
//                                                      chartData,
//                                                      scales,
//                                                      chartImages,
//                                                  }) => {
//     const currentDate = new Date().toLocaleDateString()
//     const firstChunk = chartData.slice(0, 4)
//     const remainingChunks = chartData
//         .slice(4)
//         .reduce<ChartData[][]>((acc, _, i) => {
//             if (i % 4 === 0) acc.push(chartData.slice(i + 4, i + 8))
//             return acc
//         }, [])
//
//     return (
//         <Document>
//             <Page size="A4" style={styles.page}>
//                 <View style={styles.section}>
//                     <Text style={styles.header}>Analysis Results</Text>
//                     <Text style={styles.text}>Generated on {currentDate}</Text>
//                 </View>
//                 <View style={styles.card}>
//                     <Text style={styles.subHeader}>Analysis Summary</Text>
//                     <Text style={styles.text}>{lieAnalysis}</Text>
//                 </View>
//                 <View style={styles.scoreTable}>
//                     <Text style={styles.subHeader}>Score Classification Table</Text>
//                     <ScoreClassificationTable data={scoreClassificationData} />
//                 </View>
//                 <Text style={styles.footer}>
//                     This report is confidential and should be handled accordingly.
//                 </Text>
//                 <Text style={styles.pageNumber}>Page 1</Text>
//             </Page>
//
//             <Page size="A4" style={styles.page}>
//                 <View style={styles.card}>
//                     <Text style={styles.subHeader}>Total Score</Text>
//                     <Text style={styles.text}>
//                         Your total score: {totalSummedValues.toFixed(1)}
//                     </Text>
//                 </View>
//
//                 <View style={styles.nextSteps}>
//                     <Text style={styles.nextStepsTitle}>Next Steps</Text>
//                     <Text style={styles.nextStepsSubtext}>
//                         Thank you for completing your analysis. Based on your results, we recommend the following actions to help you move forward:
//                     </Text>
//                     <View style={styles.nextStepsList}>
//                         <View style={styles.nextStepsListItem}>
//                             <Text style={styles.nextStepsListBullet}>•</Text>
//                             <Text style={styles.nextStepsScoreHighlight}>
//                                 Your Total Composite Score is {totalSummedValues.toFixed(1)}
//                             </Text>
//                         </View>
//                         <View style={styles.nextStepsListItem}>
//                             <Text style={styles.nextStepsListBullet}>•</Text>
//                             <Text>Identify key areas where improvements are needed.</Text>
//                         </View>
//
//                         <View style={styles.nextStepsListItem}>
//                             <Text style={styles.nextStepsListBullet}>•</Text>
//                             <Text>Reflect on which relationships need attention (e.g., family, friends, colleagues, romantic partners).
//                             </Text>
//                         </View>
//
//                         <View style={styles.nextStepsListItem}>
//                             <Text style={styles.nextStepsListBullet}>•</Text>
//                             <Text>Actively listen to others without interrupting or judging.</Text>
//                         </View>
//
//                         <View style={styles.nextStepsListItem}>
//                             <Text style={styles.nextStepsListBullet}>•</Text>
//                             <Text>Use &apos;I&apos; statements (e.g., &apos;I feel&apos; rather than &apos;You always&apos;) to express your emotions constructively.</Text>
//                         </View>
//
//                         <View style={styles.nextStepsListItem}>
//                             <Text style={styles.nextStepsListBullet}>•</Text>
//                             <Text>Spend quality time doing things that strengthen your bond, such as shared hobbies, outings, or traditions.</Text>
//                         </View>
//
//                         <View style={styles.nextStepsListItem}>
//                             <Text style={styles.nextStepsListBullet}>•</Text>
//                             <Text>Address disagreements calmly and focus on solutions rather than assigning blame.</Text>
//                         </View>
//
//                         <View style={styles.nextStepsListItem}>
//                             <Text style={styles.nextStepsListBullet}>•</Text>
//                             <Text>Agree to disagree when necessary to maintain harmony.</Text>
//                         </View>
//
//                         <View style={styles.nextStepsListItem}>
//                             <Text style={styles.nextStepsListBullet}>•</Text>
//                             <Text>Relationship improvements take time. Stay consistent in your efforts to build trust and connection.</Text>
//                         </View>
//
//                         <View style={styles.nextStepsListItem}>
//                             <Text style={styles.nextStepsListBullet}>•</Text>
//                             <Text>Remember, proactive steps today can lead to significant improvements tomorrow.</Text>
//                         </View>
//
//                     </View>
//                 </View>
//
//                 {chartImages.map((src, index) => (
//                     <View key={index} style={styles.chartContainer}>
//                         <Text style={styles.subHeader}>
//                             Scale {scales[index]?.[0]?.number}:{' '}
//                             {scales[index]?.[0]?.name}
//                         </Text>
//                         <Image style={styles.chart} src={src} />
//                     </View>
//                 ))}
//                 <Text style={styles.footer}>
//                     This report is confidential and should be handled accordingly.
//                 </Text>
//                 <Text style={styles.pageNumber}>Page 2</Text>
//             </Page>
//
//             <Page size="A4" style={styles.page}>
//                 <View style={styles.section}>
//                     <Text style={styles.subHeader}>Detailed Scores</Text>
//                     <ChunkTable data={firstChunk} />
//                 </View>
//                 <Text style={styles.footer}>
//                     This report is confidential and should be handled accordingly.
//                 </Text>
//                 <Text style={styles.pageNumber}>Page 3</Text>
//             </Page>
//
//             {remainingChunks.map((chunk, i) => (
//                 <Page key={i} size="A4" style={styles.page}>
//                     <ChunkTable data={chunk} />
//                     <Text style={styles.footer}>
//                         This report is confidential and should be handled accordingly.
//                     </Text>
//                     <Text style={styles.pageNumber}>Page {i + 4}</Text>
//                 </Page>
//             ))}
//         </Document>
//     )
// }
//
// export default PDFDocument

import React from 'react'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from '@react-pdf/renderer'

interface Scale {
    number: number
    name: string
}

interface ChartData {
    scale: string
    score: number
    statement: string
}

interface ScoreClassification {
    total: string
    percentile: string
    rq: string
    classification: string
}

interface PDFDocumentProps {
    lieAnalysis: string
    totalSummedValues: number
    chartData: ChartData[]
    scales: Scale[][]
    chartImages: string[]
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Helvetica',
    },
    section: { marginBottom: 20 },
    header: {
        fontSize: 24,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 20,
        color: '#1F2937',
    },
    subHeader: {
        fontSize: 18,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 10,
        color: '#374151',
    },
    text: {
        fontSize: 12,
        lineHeight: 1.5,
        color: '#4B5563',
        marginBottom: 10
    },
    card: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    chartContainer: { marginVertical: 10 },
    chart: { width: '100%', height: 200, marginBottom: 10 },
    scoreTable: { marginVertical: 20 },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingVertical: 8,
    },
    tableHeader: {
        backgroundColor: '#F3F4F6',
        fontFamily: 'Helvetica-Bold'
    },
    tableCell: {
        flex: 1,
        padding: 8,
        fontSize: 10
    },
    tableCellHeader: {
        flex: 1,
        padding: 8,
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'center',
        color: '#6B7280',
        fontSize: 10,
    },
    pageNumber: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        fontSize: 10,
        color: '#6B7280',
    },
    nextSteps: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    nextStepsTitle: {
        fontSize: 20,
        fontFamily: 'Helvetica-Bold',
        color: '#1F2937',
        marginBottom: 12,
    },
    nextStepsSubtext: {
        fontSize: 12,
        color: '#4B5563',
        marginBottom: 16,
    },
    nextStepsList: {
        marginLeft: 15,
    },
    nextStepsListItem: {
        fontSize: 12,
        color: '#4B5563',
        marginBottom: 8,
        flexDirection: 'row',
    },
    nextStepsListBullet: {
        width: 10,
        marginRight: 5,
    },
    nextStepsScoreHighlight: {
        fontSize: 12,
        fontFamily: 'Helvetica-Bold',
        color: '#1F2937',
        marginBottom: 8,
    },
})

const scoreClassificationData: ScoreClassification[] = [
    {
        total: '>= 1501.0',
        percentile: '98th and above',
        rq: '130 and above',
        classification: 'Very Superior',
    },
    {
        total: '1416 to 1500.5',
        percentile: '91 to 97',
        rq: '120-129',
        classification: 'Superior',
    },
    {
        total: '1314 to 1415.5',
        percentile: '75 to 90',
        rq: '110-119',
        classification: 'High Average',
    },
    {
        total: '1152 to 1313.5',
        percentile: '25 to 74',
        rq: '90-109',
        classification: 'Average',
    },
    {
        total: '1027 to 1151.5',
        percentile: '9 to 24',
        rq: '80-89',
        classification: 'Low Average',
    },
    {
        total: '903.5 to 1026.5',
        percentile: '2 to 8',
        rq: '70-79',
        classification: 'Borderline',
    },
    {
        total: '<= 903',
        percentile: '1.98 and below',
        rq: '69 and below',
        classification: 'Inferior',
    },
]

const ScoreClassificationTable = ({
                                      data,
                                  }: {
    data: ScoreClassification[]
}) => (
    <>
        <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Total (Composite) Scores</Text>
            <Text style={styles.tableCell}>Percentile</Text>
            <Text style={styles.tableCell}>RQ</Text>
            <Text style={styles.tableCell}>Classification</Text>
        </View>
        {data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.total}</Text>
                <Text style={styles.tableCell}>{item.percentile}</Text>
                <Text style={styles.tableCell}>{item.rq}</Text>
                <Text style={styles.tableCell}>{item.classification}</Text>
            </View>
        ))}
    </>
)

const ChunkTable = ({ data }: { data: ChartData[] }) => (
    <>
        <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>Scale</Text>
            <Text style={styles.tableCell}>Score</Text>
            <Text style={styles.tableCell}>Statement</Text>
        </View>
        {data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.scale}</Text>
                <Text style={styles.tableCell}>{item.score.toFixed(1)}</Text>
                <Text style={styles.tableCell}>{item.statement}</Text>
            </View>
        ))}
    </>
)

const PDFDocument: React.FC<PDFDocumentProps> = ({
                                                     lieAnalysis,
                                                     totalSummedValues,
                                                     chartData,
                                                     scales,
                                                     chartImages,
                                                 }) => {
    const currentDate = new Date().toLocaleDateString()
    const firstChunk = chartData.slice(0, 4)
    const remainingChunks = chartData
        .slice(4)
        .reduce<ChartData[][]>((acc, _, i) => {
            if (i % 4 === 0) acc.push(chartData.slice(i + 4, i + 8))
            return acc
        }, [])

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.header}>Analysis Results</Text>
                    <Text style={styles.text}>Generated on {currentDate}</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.subHeader}>Analysis Summary</Text>
                    <Text style={styles.text}>{lieAnalysis}</Text>
                </View>
                <View style={styles.scoreTable}>
                    <Text style={styles.subHeader}>Score Classification Table</Text>
                    <ScoreClassificationTable data={scoreClassificationData} />
                </View>
                <Text style={styles.footer}>
                    This report is confidential and should be handled accordingly.
                </Text>
                <Text style={styles.pageNumber}>Page 1</Text>
            </Page>

            <Page size="A4" style={styles.page}>
                <View style={styles.card}>
                    <Text style={styles.subHeader}>Total Score</Text>
                    <Text style={styles.text}>
                        Your total score: {totalSummedValues.toFixed(1)}
                    </Text>
                </View>

                <View style={styles.nextSteps}>
                    <Text style={styles.nextStepsTitle}>Next Steps</Text>
                    <Text style={styles.nextStepsSubtext}>
                        Thank you for completing your analysis. Based on your results, we recommend the following actions to help you move forward:
                    </Text>
                    <View style={styles.nextStepsList}>
                        <View style={styles.nextStepsListItem}>
                            <Text style={styles.nextStepsListBullet}>•</Text>
                            <Text style={styles.nextStepsScoreHighlight}>
                                Your Total Composite Score is {totalSummedValues.toFixed(1)}
                            </Text>
                        </View>
                        <View style={styles.nextStepsListItem}>
                            <Text style={styles.nextStepsListBullet}>•</Text>
                            <Text>Identify key areas where improvements are needed.</Text>
                        </View>

                        <View style={styles.nextStepsListItem}>
                            <Text style={styles.nextStepsListBullet}>•</Text>
                            <Text>Reflect on which relationships need attention (e.g., family, friends, colleagues, romantic partners).
                            </Text>
                        </View>

                        <View style={styles.nextStepsListItem}>
                            <Text style={styles.nextStepsListBullet}>•</Text>
                            <Text>Actively listen to others without interrupting or judging.</Text>
                        </View>

                        <View style={styles.nextStepsListItem}>
                            <Text style={styles.nextStepsListBullet}>•</Text>
                            <Text>Use &apos;I&apos; statements (e.g., &apos;I feel&apos; rather than &apos;You always&apos;) to express your emotions constructively.</Text>
                        </View>

                        <View style={styles.nextStepsListItem}>
                            <Text style={styles.nextStepsListBullet}>•</Text>
                            <Text>Spend quality time doing things that strengthen your bond, such as shared hobbies, outings, or traditions.</Text>
                        </View>

                        <View style={styles.nextStepsListItem}>
                            <Text style={styles.nextStepsListBullet}>•</Text>
                            <Text>Address disagreements calmly and focus on solutions rather than assigning blame.</Text>
                        </View>

                        <View style={styles.nextStepsListItem}>
                            <Text style={styles.nextStepsListBullet}>•</Text>
                            <Text>Agree to disagree when necessary to maintain harmony.</Text>
                        </View>

                        <View style={styles.nextStepsListItem}>
                            <Text style={styles.nextStepsListBullet}>•</Text>
                            <Text>Relationship improvements take time. Stay consistent in your efforts to build trust and connection.</Text>
                        </View>

                        <View style={styles.nextStepsListItem}>
                            <Text style={styles.nextStepsListBullet}>•</Text>
                            <Text>Remember, proactive steps today can lead to significant improvements tomorrow.</Text>
                        </View>
                    </View>
                </View>

                {chartImages.map((src, index) => (
                    <View key={index} style={styles.chartContainer}>
                        <Text style={styles.subHeader}>
                            Scale {scales[index]?.[0]?.number}:{' '}
                            {scales[index]?.[0]?.name}
                        </Text>
                        <Image style={styles.chart} src={src} />
                    </View>
                ))}
                <Text style={styles.footer}>
                    This report is confidential and should be handled accordingly.
                </Text>
                <Text style={styles.pageNumber}>Page 2</Text>
            </Page>

            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.subHeader}>Detailed Scores</Text>
                    <ChunkTable data={firstChunk} />
                </View>
                <Text style={styles.footer}>
                    This report is confidential and should be handled accordingly.
                </Text>
                <Text style={styles.pageNumber}>Page 3</Text>
            </Page>

            {remainingChunks.map((chunk, i) => (
                <Page key={i} size="A4" style={styles.page}>
                    <ChunkTable data={chunk} />
                    <Text style={styles.footer}>
                        This report is confidential and should be handled accordingly.
                    </Text>
                    <Text style={styles.pageNumber}>Page {i + 4}</Text>
                </Page>
            ))}
        </Document>
    )
}

export default PDFDocument