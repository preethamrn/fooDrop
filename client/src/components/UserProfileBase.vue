<template>
 <div class="user-profile-base">
   <header-base/>
   <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class='user-profile-card'>
          <v-form ref='form' v-model='valid' lazy-validation>
            <v-card-title><h3 class="headline mb-0">User Profile</h3></v-card-title>
            
            <v-combobox
              v-model='defaultDietaryRestrictions'
              :rules='dietaryRestrictionsRules'
              :items='dietaryRestrictionsList'
              label='Dietary Restrictions'
              chips
              clearable
              solo
              multiple
              dense
            >
              <template slot='selection' slot-scope='data'>
                <v-chip
                  :selected='data.selected'
                  close
                  @input='removeDietaryRestriction(data.item)'
                >
                  <strong>{{ data.item }}</strong>&nbsp;
                </v-chip>
              </template>
            </v-combobox>

            <v-layout row>
              <v-flex xs10><v-range-slider class='padded-slider' v-model='defaultPriceRange' :max='100' :min='0'></v-range-slider></v-flex>
              <v-flex xs1><v-text-field label='Price' prefix='$' v-model='defaultPriceRange[0]'></v-text-field></v-flex>
              <v-flex xs1><v-text-field prefix='-' v-model='defaultPriceRange[1]'></v-text-field></v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs10><v-slider class='padded-slider' v-model='defaultRadius' :max='15' :min='0'></v-slider></v-flex>
              <v-flex xs2><v-text-field class='padded-input' label='Radius' suffix='mi' v-model='defaultRadius'></v-text-field></v-flex>
            </v-layout>

            <v-card-actions>
              <v-btn flat color='green' :disabled='!valid'>Update Defaults</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
   </v-layout>
 </div>
</template>

<script>
import HeaderBase from '@/components/HeaderBase'
export default {
  name: 'user-profile-base',
  components: {
    HeaderBase
  },
  data () {
    return {
      // validation
      valid: true,
      dietaryRestrictionsList: ['gluten free', 'vegan', 'vegetarian', 'lactose free', 'nut free'],
      dietaryRestrictionsRules: [(v) => { return (v && v.every((d) => { return this.dietaryRestrictionsList.includes(d); })) || 'Dietary Restrictions must be from dropdown!' }],

      // default search values
      defaultDietaryRestrictions: [],
      defaultPriceRange: [0, 5],
      defaultRadius: 5
    }
  },
  methods: {
    removeDietaryRestriction (item) {
      this.defaultDietaryRestrictions.splice(this.defaultDietaryRestrictions.indexOf(item), 1)
      this.defaultDietaryRestrictions = [...this.defaultDietaryRestrictions]
    }
  }
}
</script>

<style scoped>
.user-profile-card {
  margin-left: 1em;
  margin-right: 1em;
}

.v-card__title {
  padding: 1em 2em 0 1em;
}

.padded-slider {
  margin-left: 1em;
  margin-right: 1em;
}

.padded-input {
  margin-right: 1em;
}
</style>
