<template>
    <v-row>
        <v-col cols="12" sm="12" md="6" lg="4" xl="4" class="d-none d-lg-block">
            <div class="d-flex flex-row-reverse">
                <div class="d-flex flex-column">
                    <v-skeleton-loader class="border" width="80" type="image"></v-skeleton-loader>
                    <v-skeleton-loader class="border mt-3" width="80" type="image"></v-skeleton-loader>
                </div>
            </div>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4" xl="4" style="height: 75vh">
            <v-skeleton-loader class="border w-100" type="image@4" color="background"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" sm="12" md="6" lg="4" xl="4">
            <v-skeleton-loader color="background" class="mx-auto" width="w-100"
                type="article, sentences"></v-skeleton-loader></v-col>
    </v-row>
</template>
<style scoped>
.custom-skeleton::v-deep .v-skeleton-loader__element {
    height: 500px;
}
</style>