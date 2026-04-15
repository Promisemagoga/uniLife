import { getSpendingSummary } from "@/api/tracker";
import { View } from "@/components/Themed";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";




export default function Home() {
  // const [summary, setSummary] = useState<any>(null);

  // useEffect(() => {
  //   const loadData = async () => {
  //     const data = await getSpendingSummary();
  //     setSummary(data);
  //   };

  //   loadData();
  // }, []);

  // if (!summary) return null;

  return (
    <ScrollView>
      <Text
        style={{
          fontSize: 22,
          backgroundColor: "#115eac",
          padding: 50,
          color: "#ffffff",
          textAlign: "center",
          marginBottom: 50,
        }}
      >
        Spending Tracker 📊
      </Text>

      {/* <PieChart
        data={[
          {
            name: "Groceries",
            amount: summary.groceries,
            color: "#2563EB",
            legendFontColor: "#333",
            legendFontSize: 14,
          },
          {
            name: "Transport",
            amount: summary.transport,
            color: "#10B981",
            legendFontColor: "#333",
            legendFontSize: 14,
          },
          {
            name: "Airtime",
            amount: summary.airtime,
            color: "#F59E0B",
            legendFontColor: "#333",
            legendFontSize: 14,
          },
          {
            name: "Savings",
            amount: summary.savings,
            color: "#EF4444",
            legendFontColor: "#333",
            legendFontSize: 14,
          },
        ]}
        width={screenWidth}
        height={220}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
      />
      <View style={styles.card}>
        <Text>Total Spending</Text>
        <Text style={styles.amount}>
          R{summary.groceries + summary.transport + summary.airtime}
        </Text>
      </View>

      <View style={styles.card}>
        <Text>Savings</Text>
        <Text style={styles.amount}>R{summary.savings}</Text>
      </View>

      <View style={styles.card}>
        <Text>Top Category</Text>
        <Text style={styles.amount}>Groceries</Text>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 3,
  },

  amount: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
});
