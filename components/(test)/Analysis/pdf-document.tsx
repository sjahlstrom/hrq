import React from 'react'
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image
} from '@react-pdf/renderer';

interface Scale {
    number: number;
    name: string;
}

interface ChartData {
    scale: string;
    score: number;
    statement: string;
}

interface PDFDocumentProps {
    lieAnalysis: string;
    totalSummedValues: number;
    chartData: ChartData[];
    scales: Scale[][];
    chartImages: string[];
}

// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Helvetica',
    },
    section: {
        marginBottom: 20,
    },
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
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    chartContainer: {
        marginVertical: 10,
    },
    chart: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
    scoreTable: {
        marginTop: 20,
        marginBottom: 20,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingVertical: 8,
    },
    tableHeader: {
        backgroundColor: '#F3F4F6',
        fontFamily: 'Helvetica-Bold',
    },
    tableCell: {
        flex: 1,
        padding: 8,
        fontSize: 10,
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
        padding: 15,
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
    },
    nextStepItem: {
        marginBottom: 10,
        fontSize: 12,
        color: '#4B5563',
    }
});

// Score classification data
const scoreClassificationData = [
    { total: '>= 1501.0', percentile: '98th and above', rq: '130 and above', classification: 'Very Superior' },
    { total: '1416 to 1500.5', percentile: '91 to 97', rq: '120-129', classification: 'Superior' },
    { total: '1314 to 1415.5', percentile: '75 to 90', rq: '110-119', classification: 'High Average' },
    { total: '1152 to 1313.5', percentile: '25 to 74', rq: '90-109', classification: 'Average' },
    { total: '1027 to 1151.5', percentile: '9 to 24', rq: '80-89', classification: 'Low Average' },
    { total: '903.5 to 1026.5', percentile: '2 to 8', rq: '70-79', classification: 'Borderline' },
    { total: '<= 903', percentile: '1.98 and below', rq: '69 and below', classification: 'Inferior' },
];

const getNextStepsText = (totalScore: number) => {
    if (totalScore >= 1501.0) {
        return "Based on your Very Superior score, we recommend focusing on maintaining and further developing your advanced capabilities. Consider taking on leadership roles and mentoring others.";
    } else if (totalScore >= 1416) {
        return "Your Superior score indicates excellent capabilities. We recommend pursuing advanced opportunities and continuing to challenge yourself with complex tasks.";
    } else if (totalScore >= 1314) {
        return "With your High Average score, we suggest focusing on specific areas for improvement while leveraging your current strengths. Consider additional training in specialized areas.";
    } else if (totalScore >= 1152) {
        return "Your Average score indicates good general capabilities. Focus on identifying specific areas for improvement and developing targeted skills.";
    } else if (totalScore >= 1027) {
        return "With your Low Average score, we recommend focusing on fundamental skill development and considering additional support or training in key areas.";
    } else if (totalScore >= 903.5) {
        return "Based on your Borderline score, we strongly recommend seeking additional support and guidance. Consider working with a specialist to develop a structured improvement plan.";
    } else {
        return "Your current score suggests the need for comprehensive support and intervention. We recommend working closely with specialists to develop a detailed improvement strategy.";
    }
};

const PDFDocument: React.FC<PDFDocumentProps> = ({
                                                     lieAnalysis,
                                                     totalSummedValues,
                                                     chartData,
                                                     scales,
                                                     chartImages,
                                                 }) => {
    const currentDate = new Date().toLocaleDateString();
    const nextStepsText = getNextStepsText(totalSummedValues);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.section}>
                    <Text style={styles.header}>Analysis Results</Text>
                    <Text style={styles.text}>Generated on {currentDate}</Text>
                </View>

                {/* Analysis Summary */}
                <View style={styles.card}>
                    <Text style={styles.subHeader}>Analysis Summary</Text>
                    <Text style={styles.text}>{lieAnalysis}</Text>
                </View>

                {/* Score Classification Table */}
                <View style={styles.scoreTable}>
                    <Text style={styles.subHeader}>Score Classification Table</Text>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.tableCellHeader}>Total (Composite) Scores</Text>
                        <Text style={styles.tableCellHeader}>Percentile</Text>
                        <Text style={styles.tableCellHeader}>RQ</Text>
                        <Text style={styles.tableCellHeader}>Classification</Text>
                    </View>
                    {scoreClassificationData.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.total}</Text>
                            <Text style={styles.tableCell}>{item.percentile}</Text>
                            <Text style={styles.tableCell}>{item.rq}</Text>
                            <Text style={styles.tableCell}>{item.classification}</Text>
                        </View>
                    ))}
                </View>

                {/* Total Score */}
                <View style={styles.card}>
                    <Text style={styles.subHeader}>Total Score</Text>
                    <Text style={styles.text}>
                        Your total score: {totalSummedValues.toFixed(1)}
                    </Text>
                </View>

                {/* Next Steps */}
                <View style={styles.nextSteps}>
                    <Text style={styles.subHeader}>Next Steps</Text>
                    <Text style={styles.nextStepItem}>{nextStepsText}</Text>
                </View>

                {/* Charts */}
                {chartImages.map((chartImage, index) => (
                    <View key={index} style={styles.chartContainer}>
                        <Text style={styles.subHeader}>
                            Scale {scales[index]?.[0]?.number}: {scales[index]?.[0]?.name}
                        </Text>
                        <Image
                            style={styles.chart}
                            src={chartImage}
                        />
                    </View>
                ))}

                {/* Chart Data Table */}
                <View style={styles.section}>
                    <Text style={styles.subHeader}>Detailed Scores</Text>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                        <Text style={styles.tableCell}>Scale</Text>
                        <Text style={styles.tableCell}>Score</Text>
                        <Text style={styles.tableCell}>Statement</Text>
                    </View>
                    {chartData.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{item.scale}</Text>
                            <Text style={styles.tableCell}>{item.score.toFixed(1)}</Text>
                            <Text style={styles.tableCell}>{item.statement}</Text>
                        </View>
                    ))}
                </View>

                {/* Footer */}
                <Text style={styles.footer}>
                    This report is confidential and should be handled accordingly.
                </Text>
                <Text style={styles.pageNumber}>Page 1</Text>
            </Page>
        </Document>
    );
};

export default PDFDocument;