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
        color: '#aa0000',
    },
    text: {
        fontSize: 12,
        lineHeight: 1.5,
        color: '#4B5563',
        marginBottom: 10,
    },

    scoreText: {
        fontSize: 12,
        lineHeight: 1.5,
        color: '#aa0000',
        marginBottom: 10,
    },

    card: {
        backgroundColor: '#e0f2fe',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#FF0000',
    },
    chartContainer: { marginVertical: 10 },
    chart: { width: '100%', height: 200, marginBottom: 10 },
    scoreTable: { marginVertical: 20 },
    tableRow: {
        flexDirection: 'row',
        // borderBottomWidth: 1,
        // borderBottomColor: '#E5E7EB',
        // borderColor: '#FF0000',
        paddingVertical: 8,
    },
    tableHeader: {
        backgroundColor: '#e0f2fe',
        borderRadius: 8,
        fontFamily: 'Helvetica-Bold',
    },
    tableCell: {
        flex: 1,
        padding: 8,
        fontSize: 12,
    },
    tableCellHeader: {
        flex: 1,
        padding: 8,
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        backgroundColor: '#e0f2fe',
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

const ChunkTable = ({ data, isFirstPage }: { data: ChartData[], isFirstPage?: boolean }) => (
    <>
        {isFirstPage && (
            <View style={[styles.tableRow]}>
                <Text style={[styles.tableCell, { textAlign: 'center', marginBottom: 10 }]}>
                    The following is a narrative of your test scores
                </Text>
            </View>
        )}
        <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { textAlign: 'center' }]}>Statements</Text>
        </View>
        {data.map((item, index) => (
            <View key={index} style={[styles.tableRow]}>
                <Text style={[styles.tableCell, { textAlign: 'left' }]}>{item.statement}</Text>
            </View>
        ))}
    </>
)


const PDFDocument: React.FC<PDFDocumentProps> = ({
    lieAnalysis,
    totalSummedValues,
    chartData,
}) => {
    const currentDate = new Date().toLocaleDateString()
    const chunks = chartData.reduce<ChartData[][]>((acc, _, i) => {
        if (i % 7 === 0) acc.push(chartData.slice(i, i + 7))
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
                    <Text style={styles.subHeader}>Test Validity</Text>
                    <Text style={styles.text}>{lieAnalysis}</Text>
                </View>
                <View style={styles.scoreTable}>
                    <Text style={styles.subHeader}>
                        Score Classification Table
                    </Text>
                    <ScoreClassificationTable data={scoreClassificationData} />
                </View>

                <View>
                    <Text style={styles.scoreText}>
                        Your total score is: {totalSummedValues.toFixed(1)}
                    </Text>
                </View>

                <Text style={styles.footer}>
                    This report is confidential and should be handled
                    accordingly.
                </Text>
                <Text style={styles.pageNumber}>Page 1</Text>
            </Page>


            {chunks.map((chunk, i) => (
                <Page key={i} size="A4" style={styles.page}>
                    <ChunkTable data={chunk} isFirstPage={i === 0} />
                    <Text style={styles.footer}>
                        This report is confidential and should be handled accordingly.
                    </Text>
                    <Text style={styles.pageNumber}>Page {i + 2}</Text>
                </Page>
            ))}

        </Document>
    )
}
export default PDFDocument
