const regex = {
  // 여기서의 data 는 화살표 함수로 선언하면 안된다.
  // 화살표 함수 사용 시 this.checkEmailValidate 의 this 가 무엇인지 생각해보면 알 수 있다.
  data() {
    return {
      clubTeamNameRules: [
        v => !!v || "name is required",
        v => (v && v.length <= 25) || "Name must be less than 25 characters"
      ],
      // true 면 club Full Name 사용가능, false 면 사용 불가 ( 중복 된 클럽 Name )
      clubFullNameValidate: true,
      // club 의 full Name 의 경우에는 중복이 되면 안 된다
      clubFullNameRules: [
        v => !!v || "name is required",
        v => (v && v.length <= 25) || "Name must be less than 25 characters",
        v => this.checkClubNameValidate(v) || "club name duplicated"
      ],
      /* true 면 start date 가 end date 보다 앞선 날짜인 상태 ( vice versa )
         dateDiffRules 와 함께 볼 것*/
      dateDiffValidate: true,
      /* - 날짜의 범위를 지정하는 경우, start date 가 항상 end date 보다 앞선 날짜여야 된다. 
         - 이 부분을 사용하는 곳 ex) /components/dialog/contract/main.vue */
      dateDiffRules: [
        v => !!v || "empty is not allowed",
        v => this.checkDateDiffValidate(v) || "check start-end date order"
      ],
      descriptionValidate: true,
      // /components/dialog/contract/main.vue 의 "부연설명" 에서 사용 (optional)
      descriptionRules: [
        v =>
          this.checkDescription(v) ||
          "Description must be less than 100 characters"
      ],
      // true 면 이메일 사용가능, false 면 사용 불가(중복된 이메일)
      emailValidate: true,
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid",
        v => this.checkEmailValidate(v) || "Email duplicated or not existed"
      ],
      emptyCheckRules: [v => !!v || "empty is not allowed"],
      // identifyPwdRules 를 사용하는 View || Component 는 data 로 pwd, identifyPwd 를 정의해야 한다.
      identifyPwdRules: [
        v => !!v || "Identify password is required",
        v => this.checkPwdValidate(v) || "Password Incorrect"
      ],
      pwdRules: [
        v => !!v || "password is required"
        // ,
        // 8 자 이상 ( 문자 1, 숫자  1, 특수문자 각각 1개 이상씩 )
        // v =>
        //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/.test(
        //     v
        //   ) || "Invalid Password format"
      ],
      mobileRules: [
        v => /^\d{3}-\d{3,4}-\d{4}$/.test(v) || "ex) 010-1234-5678"
      ],
      nameRules: [
        v => !!v || "name is required",
        v => (v && v.length <= 50) || "Name must be less than 50 characters"
      ],
      userTypeRules: [v => !!v || "Type is required"]
    };
  },

}

export default regex;