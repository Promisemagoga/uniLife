import { saveShoppingList } from "@/api/shopping";
import { ShoppingItem } from "@/types/ShoppingItem";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import uuid from "react-native-uuid";


export default function ShoppingListsScreen() {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  // ONE LIST ID PER LIST SESSION
  const [listId] = useState(uuid.v4().toString());

  async function addItem() {
    if (!name || !price) return;

    const newItem: ShoppingItem = {
      id: uuid.v4().toString(),
      name,
      price: Number(price),
      checked: false,
    };

    const updatedItems = [...items, newItem];

    setItems(updatedItems);

    const total = updatedItems.reduce((sum, item) => sum + item.price, 0);

    const progress =
      updatedItems.filter((i) => i.checked).length / updatedItems.length;

    // SAVE TO DATABASE
    await saveShoppingList({
      id: listId,
      title: "Groceries",
      date: new Date(),
      items: updatedItems,
      total,
      progress,
    });

    setName("");
    setPrice("");
  }

  async function toggleItem(id: string) {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            checked: !item.checked,
          }
        : item,
    );

    setItems(updatedItems);

    const total = updatedItems.reduce((sum, item) => sum + item.price, 0);

    const progress =
      updatedItems.filter((i) => i.checked).length / updatedItems.length;

    await saveShoppingList({
      id: listId,
      title: "Groceries",
      date: new Date(),
      items: updatedItems,
      total,
      progress,
    });
  }

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const progress =
    items.length === 0
      ? 0
      : items.filter((i) => i.checked).length / items.length;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>

      <TextInput
        placeholder="Item name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Price"
        keyboardType="numeric"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
      />

      <TouchableOpacity style={styles.button} onPress={addItem}>
        <Text style={styles.btnText}>Add Item</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => toggleItem(item.id)}
            style={styles.item}
          >
            <Text style={[styles.itemText, item.checked && styles.checked]}>
              {item.name} - R{item.price}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.total}>Total: R{total}</Text>

      <Text style={styles.progress}>
        Progress:
        {(progress * 100).toFixed(0)}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },

  button: {
    backgroundColor: "#2E86DE",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  btnText: {
    color: "white",
    textAlign: "center",
  },

  item: {
    padding: 10,
  },

  itemText: {
    fontSize: 16,
  },

  checked: {
    textDecorationLine: "line-through",
    color: "gray",
  },

  total: {
    fontSize: 18,
    marginTop: 20,
  },

  progress: {
    fontSize: 16,
    marginTop: 5,
  },
});
