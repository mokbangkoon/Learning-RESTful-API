<template>
  <div>
    <div>
      <h1>사원 테이블</h1>
      <div>
        <button @click="getRequest">데이터 가져오기</button>
      </div>
      <div class="mt-5" @click="togglePost">
        <button>데이터 등록하기</button>
      </div>
      <div v-show="showPost">
        <div><span>이름</span> <input type="text" v-model="nameText" /></div>
        <div>
          <span>팀 명</span> <input type="text" v-model="teamNameText" />
        </div>
        <div>
          <span>핸드폰 번호(선택)</span>
          <input type="text" v-model="phoneNumberText" />
        </div>
        <div v-show="showPostButton">
          <button @click="postRequest">등록</button>
        </div>
        <div v-show="showUpdateButton">
          <button @click="updateRequest">업데이트</button>
        </div>
      </div>
      <table>
        <tr>
          <th>사번</th>
          <th>사원 명</th>
          <th>팀 명</th>
          <th>핸드폰 번호</th>
          <th>수정모드<input type="checkbox" v-model="isChecked" /></th>
        </tr>
        <tr v-for="(el, idx) in membersData.companyMember" :key="idx">
          <td>{{ el.identificationNumber }}</td>
          <td>{{ el.name }}</td>
          <td>{{ el.teamName }}</td>
          <td>{{ el.phoneNumber }}</td>
          <td>
            <button
              v-show="isChecked"
              class="mr-5"
              @click="deleteData(el, idx)"
            >
              삭제하기</button
            ><button v-show="isChecked" @click="toggleUpdate(el, idx)">
              수정하기
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import {
  getMembersData,
  // getSelectMemberData,
  // getSolutionsData,
  // getSelectSolutionData,
  postMembersData,
  // postSolutionsData,
  putMembersData,
  //  putSolutionsData,
  deleteMemberData,
  // deleteSolutionData,
} from "@/api/api.js";

export default {
  name: "TestApi",
  components: {},
  data() {
    return {
      membersData: "",
      selectMemberData: "",
      solutionsData: "",
      selectSolutionData: "",
      isChecked: false,
      showPost: false,
      nameText: "",
      teamNameText: "",
      phoneNumberText: "",
      showPostButton: false,
      showUpdateButton: false,
      targetIdentificationNumber: "",
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    togglePost() {
      this.showPost = !this.showPost;
      this.showPostButton = this.showPost ? true : false;
      this.showUpdateButton = false;
    },
    async postRequest() {
      await postMembersData({
        name: this.nameText,
        teamName: this.teamNameText,
        phoneNumber: this.phoneNumberText,
      });
      await this.fetchData();
    },
    async getRequest() {
      this.membersData = await getMembersData();
    },
    async deleteData(el) {
      await deleteMemberData(el.identificationNumber);
      await this.fetchData();
    },

    async toggleUpdate(el) {
      this.showPost = !this.showPost;
      this.showUpdateButton = this.showPost ? true : false;
      this.showPostButton = false;
      this.targetIdentificationNumber = el.identificationNumber;
    },
    async updateRequest() {
      const memberData = {
        name: this.nameText,
        teamName: this.teamNameText,
        phoneNumber: this.phoneNumberText,
      };
      await putMembersData(memberData, this.targetIdentificationNumber);
      await this.fetchData();
    },
    async fetchData() {
      this.membersData = await getMembersData();
      // this.selectMemberData = await getSelectMemberData(114);
      // this.solutionsData = await getSolutionsData();
      // this.selectSolutionData = await getSelectSolutionData(2);
    },
  },
};
</script>
<style lang="css" scoped>
.mr-5 {
  margin-right: 5px;
}
.mt-5 {
  margin-top: 5px;
}
</style>
