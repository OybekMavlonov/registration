<template>
  <div class="register">
    <h1>This is an registration page</h1>
    <div id="signup">
      <div class="signup-form">
        <form @submit.prevent="onSubmit" novalidate>
          <div class="input" :class="{ invalid: $v.form.fullName.$error }">
            <label for="fullName">FullName</label>
            <input
              type="text"
              placeholder="fullName"
              value=""
              v-model="form.fullName"
              autocomplete="off"
              @blur="$v.form.fullName.$touch()"
            />
            <div v-if="$v.form.fullName.$error" class="pink--text">
              <span v-if="!$v.form.fullName.required"
                >Fullname is required</span
              >
            </div>
          </div>
          <div class="input" :class="{ invalid: $v.form.nickname.$error }">
            <label for="nickname" class="label">nickname</label>
            <input
              type="text"
              placeholder="nickname"
              value=""
              v-model="form.nickname"
              autocomplete="off"
              @blur="$v.form.nickname.$touch()"
            />
            <div v-if="$v.form.nickname.$error" class="pink--text">
              <span v-if="!$v.form.nickname.required"
                >Nickname is required</span
              >
              <span v-if="form.nickname && !$v.form.nickname.valid"
                >Nickname contains alphanumeric characters and at least One
                Special Character</span
              >
              <span
                v-if="
                  form.nickname &&
                    $v.form.nickname.valid &&
                    !$v.form.nickname.minLength
                "
                >Nickname should not be less than 5 characters</span
              >
            </div>
            <p class="note green mt-2">
              Note: nickname should be at least 5 characters and contains Latin
              alphanumeric characters and signs "-", "_", "."
            </p>
          </div>
          <div class="input" :class="{ invalid: $v.form.password.$error }">
            <label for="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value=""
              v-model="form.password"
              autocomplete="off"
              @blur="$v.form.password.$touch()"
            />
            <div v-if="$v.form.password.$error" class="pink--text">
              <span v-if="!$v.form.password.required"
                >Password is required</span
              >
              <span v-if="form.password && !$v.form.password.valid"
                >Password contains at least One Special Character</span
              >
              <span
                v-if="
                  form.password &&
                    $v.form.password.valid &&
                    !$v.form.password.minLength
                "
                >Nickname should not be less than 8 characters</span
              >
            </div>
            <p class="note green mt-2">
              Note: password should be at least 8 characters long and contains
              Latin alphanumeric characters and at least one following signs
              "-", "_", ".", "+", "=", "@", "$", "!", "?"
            </p>
          </div>
          <div
            class="input"
            :class="{ invalid: $v.form.repeatPassword.$error }"
          >
            <label for="repeat-password">Repeat Password</label>
            <input
              type="password"
              placeholder="Repeat Password"
              value=""
              v-model="form.repeatPassword"
              autocomplete="off"
              @blur="$v.form.repeatPassword.$touch()"
            />
            <div v-if="$v.form.repeatPassword.$error" class="pink--text">
              <span v-if="!$v.form.repeatPassword.required"
                >Repeat Password is required</span
              >
              <span
                v-if="
                  form.repeatPassword && !$v.form.repeatPassword.sameAsPassword
                "
                >Password and Repeat Password should match</span
              >
            </div>
          </div>
          <div class="input">
            <label for="phone">Phone</label>
            <input-mask
              v-model="form.phone"
              mask="\9\98999999999"
              maskChar=""
            ></input-mask>
          </div>
          <div class="input">
            <label for="gender">Gender</label>
            <select id="gender" v-model="form.gender">
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>
          </div>
          <div class="input">
            <label>Select Country and City</label>
            <vueCountriesCities
              @country="form.country = $event"
              @city="form.city = $event"
            />
          </div>
          <div class="submit">
            <button
              type="submit"
              :disabled="$v.form.$invalid || disabled()"
              @click="dialog = true"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>

    <v-row justify="center" v-if="statusCode === 200">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
        v-if="statusCode === 200"
      >
        <!-- <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Open Dialog
          </v-btn>
        </template> -->
        <v-card>
          <v-card-title>
            <span class="headline">Enter the otp Code</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <div class="input">
                    <input-mask
                      v-model="code"
                      mask="999999"
                      placeholder="Default otp code is 654321"
                      maskChar=""
                      @keyup="sendCode"
                    ></input-mask>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="sendCode">
              Send
            </v-btn>
          </v-card-actions> -->
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import axios from "axios";
import InputMask from "vue-input-mask";
import vueCountriesCities from "vue-countries-cities";
export default {
  data() {
    return {
      form: {
        fullName: "",
        nickname: "",
        password: "",
        repeatPassword: "",
        phone: "",
        gender: "MALE",
        country: "USA",
        city: "TASHKENT",
      },
      dialog: false,
      code: "",
      registrationId: "",
      statusCode: null,
      statusSuccess: null,
      finalResponse: {},
    };
  },
  components: {
    "input-mask": InputMask,
    vueCountriesCities,
  },
  watch: {
    code() {
      if (this.code.length === 6) {
        this.sendCode();
      }
    },
  },
  validations: {
    form: {
      fullName: {
        required,
      },
      nickname: {
        required,
        minLen: minLength(5),
        valid: function(value) {
          const alphaNum = /[A-Za-z0-9]/.test(value);
          const containsSpecial = /[._-]/.test(value);
          return containsSpecial && alphaNum;
        },
      },
      password: {
        required,
        valid: function(value) {
          // const containsUppercase = /[A-Z]/.test(value);
          // const containsLowercase = /[a-z]/.test(value);
          // const containsNumber = /[0-9]/.test(value);
          const containsSpecial = /[-_.+=@$!?]/.test(value);
          return (
            // containsUppercase &&
            // containsLowercase &&
            // containsNumber &&
            containsSpecial
          );
        },
        minLength: minLength(8),
      },
      repeatPassword: {
        required,
        sameAsPassword: sameAs((vm) => {
          return vm.password;
        }),
      },
    },
    code: {
      required,
    },
  },
  methods: {
    showDialog() {
      if (this.statusCode === null) {
        this.dialog = true;
      }
    },
    disabled() {
      if (!(this.form.phone.length === 12)) {
        return true;
      }
    },
    onSubmit() {
      this.$v.$touch();
      const formData = {
        fullName: this.form.fullName,
        nickname: this.form.nickname,
        password: this.form.password,
        repeatPassword: this.form.repeatPassword,
        phone: this.form.phone,
        gender: this.form.gender,
        country: this.form.country,
        city: this.form.city,
      };
      console.log(formData);
      if (this.$v.form.$invalid) {
        return false;
      } else {
        axios
          .post("http://test.ok.paymo.uz/public/user/register", formData)
          .then((res) => {
            console.log(res);
            this.registrationId = res.data.registrationId;
            this.statusCode = res.status;
            console.log(this.registrationId);
          })
          .catch((res) => console.log(res));
      }
    },
    sendCode() {
      const otp = {
        otp: this.code,
      };
      console.log(this.code);
      axios
        .post(
          `http://test.ok.paymo.uz/public/user/confirm-registration/${this.registrationId}`,
          otp
        )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.finalResponse = res.data;
            this.statusSuccess = 200;
            this.$store.dispatch("user", this.finalResponse);
            this.$router.push("/");
          }
        })
        .catch((res) => console.log(res));
    },
  },
};
</script>

<style lang="scss" scoped>
.countries-cities {
  display: block;
  padding: 10px 0;
  .select-box {
    margin: 5px 0 !important;
    height: 40px;
    min-width: 200px;
    background: #fff;
    border: 1px solid #e9e9e9;
    position: relative;
    select {
      background: none;
      border: none;
      outline: none;
      padding-left: 7px;
      padding-right: 65px;
      appearance: none;
      width: 100%;
      height: 100%;
    }
    svg {
      position: absolute;
      right: 0;
      top: 0;
      width: 20px;
      height: 100%;
      background: darken(#fff, 3%);
      pointer-events: none;
      box-sizing: border-box;
      padding: 5px;
      path {
        fill: rgba(black, 0.7);
      }
    }
  }
}
.error {
  color: red;
}
.signup-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  font-size: 20px;
  font-weight: bold;
  float: left;
  margin-bottom: 6px;
}

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid #521751;
  background-color: #eee;
}

.input.invalid label {
  color: red;
}

.input.invalid input {
  border: 1px solid red;
  background-color: #ffc9aa;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
