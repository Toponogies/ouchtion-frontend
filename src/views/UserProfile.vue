<template>
    <v-container class="mt-5">
    <v-layout row wrap>
      <v-flex xs4 align-self-center>
          <v-img max-height="300" max-width="300" :src="image"></v-img>
      </v-flex>
      <v-flex align-self-center xs6>
        <p class="name"> 
            <input type="text" v-model="full_name" :disabled="nameInputDisable"/>
            <v-icon aria-hidden="false" class="mr-3 float-right" @click="nameInputDisable = !nameInputDisable;">
                mdi-pencil
            </v-icon>
        </p>
        <p>
            <v-icon aria-hidden="false" color="yellow" class="mr-3">
                mdi-star
            </v-icon>
            {{getpoint()}}
        </p>
        <p>
            <v-icon aria-hidden="false" color="orange" class="mr-3">
                mdi-email
            </v-icon>
            <input type="text" v-model="email" :disabled="emailInputDisable"/>
            <v-icon aria-hidden="false" class="mr-3 float-right" @click="emailInputDisable = !emailInputDisable;">
                mdi-pencil
            </v-icon>
        </p>
        <p>
            <v-icon aria-hidden="false" color="red" class="mr-3">
                mdi-cake
            </v-icon>
            <input type="text" v-model="dob" :disabled="dobInputDisable" />
            <v-icon aria-hidden="false" class="mr-3 float-right" @click="dobInputDisable = !dobInputDisable;">
                mdi-pencil
            </v-icon>
        </p>
        <p>
            <v-icon aria-hidden="false" color="red" class="mr-3">
                mdi-map-marker
            </v-icon>
            <input type="textarea" v-model="address" :disabled="addressInputDisable"/>
            <v-icon aria-hidden="false" class="mr-3 float-right" @click="addressInputDisable = !addressInputDisable;">
                mdi-pencil
            </v-icon>
        </p> 
      </v-flex>
    </v-layout>
     <v-layout row wrap>       
         <v-flex xs6 offset-lg6 class="mt-5">
            <v-btn elevation="" color="green">Update</v-btn>
         </v-flex>
     </v-layout>
  </v-container>
</template>

<script>
export default {
    name: "Profile",
    data() {
        return {
            user_id:1,
            full_name:"abc",
            address:"abc",
            dob:"2000/02/20",
            email:"abc@gmail.com",
            image: "https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg",
            addressInputDisable: true,
            nameInputDisable: true,
            emailInputDisable: true,
            dobInputDisable: true,
        };
    },
    methods:{
        getpoint(){
            return 100;
        },
        clickEdit(){

        }
    }
};
</script>
<style scoped>
    .name{
        font-weight: bold;
    }
    input:disabled {
        background: rgb(255, 255, 255);
    }
    input{
        background-color: gray;
    }
</style>