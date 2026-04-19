import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
} from "react-native";

import {
  createList,
  getLists,
  deleteList,
  updateList,
} from "../../api/lists";

import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TopBar from "@/components/TopBar";

export default function ListsScreen() {
  const [lists, setLists] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const loadLists = async () => {
    const data = await getLists();
    setLists(data);
  };

  useEffect(() => {
    loadLists();
  }, []);

  const addList = async () => {
    if (!title) return;

    await createList(title);
    setTitle("");
    loadLists();
  };

  const handleDelete = (id: number) => {
    Alert.alert("Delete list?", "This cannot be undone", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await deleteList(id);
          loadLists();
        },
      },
    ]);
  };

  const handleUpdate = async () => {
    if (!title || editingId === null) return;

    await updateList(editingId, title);

    setEditingId(null);
    setTitle("");

    loadLists();
  };

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <>
      <TopBar text="Shopping Lists 🛒"/>
    <View style={styles.container}>
      <TextInput
        placeholder="List name"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <Button
        title={editingId ? "Update List" : "Add List"}
        onPress={editingId ? handleUpdate : addList}
      />

      <FlatList
        data={lists}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* NAVIGATE TO LIST */}
            <TouchableOpacity
              onPress={() => {
                setOpenMenuId(null);
                router.push(`/${item.id}`);
              }}
            >
              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.date}>
                Created:{" "}
                {new Date(item.created_at).toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {/* ELLIPSIS BUTTON */}
            <TouchableOpacity
              onPress={() => toggleMenu(item.id)}
              style={styles.menuButton}
            >
              <FontAwesome
                name="ellipsis-v"
                size={20}
                color="grey"
              />
            </TouchableOpacity>

            {/* ACTION MENU */}
            {openMenuId === item.id && (
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => {
                    setEditingId(item.id);
                    setTitle(item.title);
                    setOpenMenuId(null);
                  }}
                >
                  <FontAwesome
                    name="edit"
                    size={20}
                    color="#4CAF50"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    handleDelete(item.id);
                    setOpenMenuId(null);
                  }}
                >
                  <FontAwesome
                    name="trash"
                    size={20}
                    color="#E53935"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    padding: 16,
    borderRadius: 12,
    position: "relative",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,

    elevation: 5,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
  },

  date: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },

  actions: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,
  },

  menuButton: {
    position: "absolute",
    top: 20,
    right: 10,
    marginRight:5
  },
});