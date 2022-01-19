<template>
    <v-row no-gutters>
        <!-- Left pane: Parent categories -->
        <v-col cols="6">
            <v-container class="ma-0 pa-4">
                <!-- Left pane toolbar -->
                <v-row no-gutters class="mb-2" align="center">
                    <div class="text-h6 font-weight-bold">Parent</div>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-on="on"
                                v-bind="attrs"
                                :disabled="selectedParent === undefined || childCategories.length > 0"
                                @click="handleDeleteParentBtn()"
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Remove</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-on="on"
                                v-bind="attrs"
                                :disabled="selectedParent === undefined"
                                @click="handleEditParentDialogOpen()"
                            >
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <span>Edit</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn icon v-on="on" v-bind="attrs" @click="handleAddParentDialogOpen()">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <span>Add</span>
                    </v-tooltip>
                </v-row>

                <!-- Left pane list -->
                <v-card outlined>
                    <v-list dense>
                        <v-row
                            no-gutters
                            justify="center"
                            align="center"
                            class="d-flex flex-column"
                            v-if="categories.length === 0"
                        >
                            <v-icon large color="grey" class="mb-1">mdi-shape-outline</v-icon>
                            <div class="grey--text mt-1">No categories</div>
                        </v-row>
                        <v-list-item-group v-model="selectedParent">
                            <v-list-item
                                v-for="item in parentCategories"
                                :key="item.category_id"
                                :value="item.category_id"
                            >
                                {{ item.name }}
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-container>
        </v-col>

        <!-- Right pane: Child categories -->
        <v-col cols="6">
            <v-container class="ma-0 pa-4">
                <!-- Right pane toolbar -->
                <v-row no-gutters class="mb-2" align="center">
                    <div class="text-h6 font-weight-bold">Child</div>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-on="on"
                                v-bind="attrs"
                                :disabled="selectedChild === undefined"
                                @click="handleDeleteChildBtn()"
                            >
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span>Remove</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-on="on"
                                v-bind="attrs"
                                :disabled="selectedChild === undefined"
                                @click="handleEditChildDialogOpen()"
                            >
                                <v-icon>mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <span>Edit</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                icon
                                v-on="on"
                                v-bind="attrs"
                                :disabled="selectedParent === undefined"
                                @click="handleAddChildDialogOpen()"
                            >
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </template>
                        <span>Add</span>
                    </v-tooltip>
                </v-row>

                <!-- Right pane list -->
                <v-card outlined>
                    <v-list dense>
                        <v-row
                            no-gutters
                            justify="center"
                            align="center"
                            class="d-flex flex-column"
                            v-if="selectedParent === undefined"
                        >
                            <v-icon large color="grey" class="mb-1">mdi-shape-outline</v-icon>
                            <div class="grey--text mt-1">Select a parent category</div>
                        </v-row>
                        <v-row
                            no-gutters
                            justify="center"
                            align="center"
                            class="d-flex flex-column"
                            v-else-if="childCategories.length === 0"
                        >
                            <v-icon large color="grey" class="mb-1">mdi-shape-outline</v-icon>
                            <div class="grey--text mt-1">No children for this parent category</div>
                        </v-row>
                        <v-list-item-group v-model="selectedChild">
                            <v-list-item
                                v-for="item in childCategories"
                                :key="item.category_id"
                                :value="item.category_id"
                            >
                                {{ item.name }}
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </v-container>
        </v-col>

        <!-- Dialog: add new category (parent) -->
        <v-dialog v-model="addParentDialogOpened" persistent max-width="640">
            <v-card>
                <!-- Header -->
                <v-row no-gutters class="px-4 py-4">
                    <div class="text-h6 font-weight-bold">New Parent Category</div>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="handleAddParentDialogCancel()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-row>

                <!-- Name field -->
                <v-row no-gutters class="px-4 pb-4">
                    <v-text-field
                        v-model="newParentCategoryName"
                        placeholder="Category name"
                        :hide-details="true"
                    ></v-text-field>
                </v-row>

                <!-- Confirm button -->
                <v-row no-gutters class="px-4 pb-4">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="handleAddParentDialogOK()"
                        :disabled="newParentCategoryName.trim().length === 0"
                    >
                        Create
                    </v-btn>
                </v-row>
            </v-card>
        </v-dialog>

        <!-- Dialog: add new category (child) -->
        <v-dialog v-model="addChildDialogOpened" persistent max-width="640">
            <v-card>
                <!-- Header -->
                <v-row no-gutters class="px-4 py-4">
                    <div class="text-h6 font-weight-bold">New Child Category</div>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="handleAddChildDialogCancel()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-row>

                <!-- Indicator: parent category -->
                <v-row no-gutters class="px-4 pb-4">
                    <div>This category will belong to "{{ selectedParentCategoryName }}"</div>
                </v-row>

                <!-- Name field -->
                <v-row no-gutters class="px-4 pb-4">
                    <v-text-field
                        v-model="newChildCategoryName"
                        placeholder="Category name"
                        :hide-details="true"
                    ></v-text-field>
                </v-row>

                <!-- Confirm button -->
                <v-row no-gutters class="px-4 pb-4">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="handleAddChildDialogOK()"
                        :disabled="newChildCategoryName.trim().length === 0"
                    >
                        Create
                    </v-btn>
                </v-row>
            </v-card>
        </v-dialog>

        <!-- Dialog: edit category name (parent) -->
        <v-dialog v-model="editParentDialogOpened" persistent max-width="640">
            <v-card>
                <!-- Header -->
                <v-row no-gutters class="px-4 py-4">
                    <div class="text-h6 font-weight-bold">Edit Parent Category</div>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="handleEditParentDialogCancel()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-row>

                <!-- Name field -->
                <v-row no-gutters class="px-4 pb-4">
                    <v-text-field
                        v-model="newParentCategoryName"
                        placeholder="Category name"
                        :hide-details="true"
                    ></v-text-field>
                </v-row>

                <!-- Confirm button -->
                <v-row no-gutters class="px-4 pb-4">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="handleEditParentDialogOK()"
                        :disabled="newParentCategoryName.trim().length === 0"
                    >
                        Create
                    </v-btn>
                </v-row>
            </v-card>
        </v-dialog>

        <!-- Dialog: edit category name (child) -->
        <v-dialog v-model="editChildDialogOpened" persistent max-width="640">
            <v-card>
                <!-- Header -->
                <v-row no-gutters class="px-4 py-4">
                    <div class="text-h6 font-weight-bold">Edit Child Category</div>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="handleEditChildDialogCancel()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-row>

                <!-- Name field -->
                <v-row no-gutters class="px-4 pb-4">
                    <v-text-field
                        v-model="newChildCategoryName"
                        placeholder="Category name"
                        :hide-details="true"
                    ></v-text-field>
                </v-row>

                <!-- Confirm button -->
                <v-row no-gutters class="px-4 pb-4">
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary"
                        @click="handleEditChildDialogOK()"
                        :disabled="newChildCategoryName.trim().length === 0"
                    >
                        Rename
                    </v-btn>
                </v-row>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { showSnack } from "@/utils/showSnack";
import { mapState, mapActions } from "vuex";
import { find } from "lodash-es";

export default {
    name: "Categories",
    data() {
        return {
            selectedParent: undefined,
            selectedChild: undefined,

            // modals

            addParentDialogOpened: false,
            addChildDialogOpened: false,
            editParentDialogOpened: false,
            editChildDialogOpened: false,

            newParentCategoryName: "",
            newChildCategoryName: "",
        };
    },
    watch: {
        selectedParent() {
            this.selectedChild = undefined;
        },
    },
    computed: {
        ...mapState("CategoryModule", ["categories"]),
        parentCategories() {
            return this.categories.filter((each) => each.parent_category_id === null);
        },
        selectedParentCategoryName() {
            return this.selectedParent ? find(this.categories, { category_id: this.selectedParent }).name : "";
        },
        selectedChildCategoryName() {
            return this.selectedChild ? find(this.categories, { category_id: this.selectedChild }).name : "";
        },
        childCategories() {
            return this.selectedParent !== undefined
                ? this.categories.filter((each) => each.parent_category_id === this.selectedParent)
                : [];
        },
    },
    methods: {
        ...mapActions("CategoryModule", ["fetchAll", "addParent", "addChild", "edit", "remove"]),

        // add parent
        handleAddParentDialogOpen() {
            this.newParentCategoryName = "";
            this.addParentDialogOpened = true;
        },
        handleAddParentDialogOK() {
            this.addParent(this.newParentCategoryName);
            this.addParentDialogOpened = false;
        },
        handleAddParentDialogCancel() {
            this.addParentDialogOpened = false;
        },

        // add child
        handleAddChildDialogOpen() {
            this.newChildCategoryName = "";
            this.addChildDialogOpened = true;
        },
        handleAddChildDialogOK() {
            this.addChild({
                parentId: this.selectedParent,
                name: this.newChildCategoryName,
            });
            this.addChildDialogOpened = false;
        },
        handleAddChildDialogCancel() {
            this.addChildDialogOpened = false;
        },

        // edit parent
        handleEditParentDialogOpen() {
            this.newParentCategoryName = this.selectedParentCategoryName;
            this.editParentDialogOpened = true;
        },
        handleEditParentDialogOK() {
            this.edit({
                id: this.selectedParent,
                name: this.newParentCategoryName,
            });
            this.editParentDialogOpened = false;
        },
        handleEditParentDialogCancel() {
            this.editParentDialogOpened = false;
        },

        // edit child
        handleEditChildDialogOpen() {
            this.newChildCategoryName = this.selectedChildCategoryName;
            this.editChildDialogOpened = true;
        },
        handleEditChildDialogOK() {
            this.edit({
                id: this.selectedChild,
                name: this.newChildCategoryName,
            });
            this.editChildDialogOpened = false;
        },
        handleEditChildDialogCancel() {
            this.editChildDialogOpened = false;
        },

        // remove
        handleDeleteParentBtn() {
            this.remove(this.selectedParent);
            this.selectedParent === undefined;
        },
        handleDeleteChildBtn() {
            this.remove(this.selectedChild);
        },
    },
    mounted() {
        this.fetchAll();
    },
};
</script>
