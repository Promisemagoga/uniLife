import {
  createItem,
  deleteItem,
  getItemsByList,
  toggleItem,
} from "@/api/items";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ListDetailsScreen() {
  const { id } = useLocalSearchParams();

  const listId = Number(id); // ✅ convert to number

  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [price, setPrice] = useState("0");

  const loadItems = async () => {
    if (!listId) return;

    const data = await getItemsByList(listId);
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, [listId]);

  const addItem = async () => {
    if (!name) return;

    await createItem({
      list_id: listId,
      name,
      quantity: Number(quantity),
      price: Number(price),
      total: Number(quantity) * Number(price),
      progress: 0,
    });

    setName("");
    setQuantity("1");
    setPrice("0");

    loadItems();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24 }}>
        List ID: {listId}
      </Text>

      <TextInput
        placeholder="Item name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Quantity"
        value={quantity}
        onChangeText={setQuantity}
      />

      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
      />

      <Button title="Add Item" onPress={addItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <TouchableOpacity
              onPress={async () => {
                await toggleItem(item.id);
                loadItems();
              }}
            >
              <Text
                style={{
                  textDecorationLine:
                    item.checked ? "line-through" : "none",
                }}
              >
                {item.name} ({item.quantity})
              </Text>
            </TouchableOpacity>

            <Button
              title="Delete"
              onPress={async () => {
                await deleteItem(item.id);
                loadItems();
              }}
            />
          </View>
        )}
      />
    </View>
  );
}