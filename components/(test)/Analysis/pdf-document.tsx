'use client'

import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import { Scale } from '@/components/(test)/Analysis/Charts/bChart'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#F3F8FF',
        padding: 30,
    },
    section: {
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 18,
        marginBottom: 5,
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
    },
    chartSection: {
        marginBottom: 20,
    },
    chartImage: {
        width: '100%',
        height: 200,
        marginBottom: 10,
    },
})

interface PDFDocumentProps {
    lieAnalysis: string
    totalSummedValues: number
    chartData: {
        scale: string
        score: number
        statement: string
    }[]
    scales: Scale[][]
    chartImages: string[]
}

const PDFDocument: React.FC<PDFDocumentProps> = ({
                                                     lieAnalysis,
                                                     totalSummedValues,
                                                     chartData,
                                                     scales,
                                                     chartImages,
                                                 }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.header}>Analysis Results</Text>

                {chartData.map((item, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{item.scale} Scale</Text>
                        <Text style={styles.text}>Score: {item.score.toFixed(2)}</Text>
                        <Text style={styles.text}>{item.statement}</Text>
                    </View>
                ))}

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Lie Analysis</Text>
                    <Text style={styles.text}>{lieAnalysis}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Total Composite Score</Text>
                    <Text style={styles.text}>Your Total Composite Score is {totalSummedValues.toFixed(2)}</Text>
                </View>

                {chartImages.map((chartImage, index) => (
                    <View key={index} style={styles.chartSection}>
                        <Text style={styles.cardTitle}>
                            Chart {index + 1}: {scales[index]?.[0]?.name || `Scale ${index + 1}`} Scale
                        </Text>
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image style={styles.chartImage} src={chartImage} />
                        <Text style={styles.text}>
                            {chartData[index]?.statement || 'No statement available for this scale.'}
                        </Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
)

export default PDFDocument