const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const membersData = {
  totalNumberEmployees: 3,
  totalPages: 1,
  currentPage: 1,
  limit: 10,
  companyMember: [
    {
      identificationNumber: 112,
      name: "차진성",
      teamName: "웹 팀",
      phoneNumber: "010-9170-1720",
    },
    {
      identificationNumber: 113,
      name: "가나다",
      teamName: "디자인 팀",
      phoneNumber: "010-1234-5678",
    },
    {
      identificationNumber: 114,
      name: "다나가",
      teamName: "마케팅 팀",
      phoneNumber: "010-1234-1111",
    },
  ],
};
const solutionsData = {
  totalNumberProjects: 4,
  totalPages: 1,
  currentPage: 1,
  limit: 10,
  projects: [
    {
      id: 1,
      projectName: "미디어 자산 관리(MAM)",
      description: `미디어 자산 관리(MAM 시스템)은 미디어 수집에서
  변환·저장·분석·배포에 이르는 전체 워크플로우를 구현합니다`,
      participants: 40,
      progress: "진행중",
    },
    {
      id: 2,
      projectName: "보도 정보 시스템",
      description: `보도 정보 시스템은 TV 뉴스를 만들기 위해 기사의 배정·작성·송고와 같은
  기사 관리 기능과 뉴스 큐시트 기능, 큐시트를 기반으로 뉴스 송출 자동화 기능까지 제공합니다.`,
      participants: 20,
      progress: "미시행",
    },
    {
      id: 3,
      projectName: "MYMY 아카이브(MYMY Archive)",
      description: `MYMY 아카이브(MYMY Archive)는 개인에서부터 단체, 공공기관에 이르기까지 영상, 사진, 오디오 등의
  데이터를 안전하게 보관하고 검색할 수 있도록 설계된 소형 미디어 자산 관리 솔루션입니다.`,
      participants: 10,
      progress: "완료",
    },
    {
      id: 4,
      projectName: "라디오 방송 솔루션 이모션 (Emotion)",
      description: `이모션은 현업 라디오 PD와 기술 감독들의 요구 사항을 철저히 반영한
  통합 라디오 방송 전문 솔루션입니다.`,
      participants: 25,
      progress: "완료",
    },
  ],
};

const isString = (data) => (typeof data === "string" ? true : false);
const isNumber = (data) => (typeof data === "number" ? true : false);
const isValidLength = (data) => {
  let validState = true;
  data.forEach((el) => {
    if (el.key === "description") {
      if (String(el.value).length > 80) {
        validState = false;
        return;
      }
    } else if (String(el.value).length > 15) {
      validState = false;
      return;
    }
  });
  return validState;
};

const membersValidation = (name, teamName, phoneNumber, method) => {
  const paramsArr = [
    { key: "name", value: name },
    { key: "teamName", value: teamName },
    { key: "phoneNumber", value: phoneNumber },
  ];
  if (method === "POST") {
    if (!isValidLength(paramsArr)) {
      return false;
    }
    if (isString(name) && isString(teamName) && isString(phoneNumber)) {
      return true;
    } else {
      return false;
    }
  }
  if (method === "PUT") {
    let filterParams = [];
    let validState = true;
    filterParams = paramsArr.filter((el) => el.value != undefined);
    if (!isValidLength(filterParams)) {
      return false;
    }
    filterParams.forEach((el) => {
      if (!isString(el.value)) {
        validState = false;
        return;
      }
    });

    return validState;
  }
};

const solutionsValidation = (
  projectName,
  description,
  participants,
  progress,
  method
) => {
  const paramsArr = [
    { key: "projectName", value: projectName },
    { key: "description", value: description },
    { key: "participants", value: participants },
    { key: "progress", value: progress },
  ];
  if (method === "POST") {
    if (!isValidLength(paramsArr)) {
      return false;
    }

    if (
      isString(projectName) &&
      isString(description) &&
      isString(progress) &&
      isNumber(participants)
    ) {
      return true;
    } else {
      return false;
    }
  }
  if (method === "PUT") {
    let filterParams = [];
    let validState = true;
    filterParams = paramsArr.filter((el) => el.value != undefined);
    if (!isValidLength(filterParams)) {
      return false;
    }
    paramsArr.forEach((el, idx) => {
      if (el.value != undefined) {
        if (idx != 2) {
          if (!isString(el.value)) {
            validState = false;
            return false;
          }
        } else {
          if (!isNumber(el.value)) {
            validState = false;
            return false;
          }
        }
      }
    });
    return validState;
  }
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/members", (req, res) => {
  const copyMembersData = { ...membersData };
  if (Object.keys(req.query).length !== 0) {
    const page = req.query.page ?? 1;
    const limit = req.query.limit ?? 10;
    const pageData = membersData.companyMember.slice(
      (page - 1) * limit,
      page * limit
    );
    copyMembersData.currentPage = page;
    copyMembersData.totalPages = Math.ceil(pageData.length / limit);
    copyMembersData.limit = limit;
    copyMembersData.companyMember = pageData;
    res.json(copyMembersData);
  } else {
    membersData.totalPages = Math.ceil(membersData.companyMember.length / 10);
    res.json(membersData);
  }
});

app.get("/members/:id", (req, res) => {
  let selectMember;
  let validSelectMember = false;
  membersData.companyMember.forEach((el) => {
    if (String(el.identificationNumber) === req.params.id) {
      validSelectMember = true;
      selectMember = el;
      return;
    }
  });
  if (validSelectMember) {
    res.json(selectMember);
  } else {
    res.status(404).json({
      message: "해당 직원은 없습니다.",
    });
  }
});

app.get("/solutions", (req, res) => {
  const copySolutionsData = { ...solutionsData };
  if (Object.keys(req.query).length !== 0) {
    const page = req.query.page ?? 1;
    const limit = req.query.limit ?? 10;
    const pageData = solutionsData.projects.slice(
      (page - 1) * limit,
      page * limit
    );
    copySolutionsData.currentPage = page;
    copySolutionsData.totalPages = Math.ceil(pageData.length / limit);
    copySolutionsData.limit = limit;
    copySolutionsData.projects = pageData;
    res.json(copySolutionsData);
  } else {
    solutionsData.totalPages = Math.ceil(solutionsData.projects.length / 10);
    res.json(solutionsData);
  }
});

app.get("/solutions/:id", (req, res) => {
  let selectSolution;
  let validSelectSolution = false;
  solutionsData.projects.forEach((el) => {
    if (String(el.id) === req.params.id) {
      validSelectSolution = true;
      selectSolution = el;
    }
  });
  if (validSelectSolution) {
    res.json(selectSolution);
  } else {
    res.status(404).json({
      message: "해당 솔루션은 존재하지 않습니다.",
    });
  }
});

app.post("/members", (req, res) => {
  if (Object.keys(req.body).length != 0 && req.body.name && req.body.teamName) {
    const name = req.body.name;
    const teamName = req.body.teamName;
    const phoneNumber = req.body.phoneNumber ?? "";
    if (!membersValidation(name, teamName, phoneNumber, "POST")) {
      res.status(400).json({
        message: "요청 타입 또는 파라미터 길이를 다시 확인해주세요.",
      });
      return;
    }
    const identificationNumber =
      membersData.companyMember[membersData.companyMember.length - 1]
        .identificationNumber;
    membersData.totalNumberEmployees += 1;
    membersData.companyMember.push({
      identificationNumber: identificationNumber + 1,
      name: name,
      teamName: teamName,
      phoneNumber: phoneNumber,
    });
    res.json({
      identificationNumber: identificationNumber + 1,
      message: "등록 완료",
    });
  } else {
    res.status(400).json({
      message: "필수값이 누락되었습니다.",
    });
  }
});

app.post("/solutions", (req, res) => {
  if (
    Object.keys(req.body).length != 0 &&
    req.body.projectName &&
    req.body.description &&
    req.body.participants &&
    req.body.progress
  ) {
    const projectName = req.body.projectName;
    const description = req.body.description;
    const participants = req.body.participants;
    const progress = req.body.progress;
    if (
      !solutionsValidation(
        projectName,
        description,
        participants,
        progress,
        "POST"
      )
    ) {
      res.status(400).json({
        message: "요청 타입 또는 파라미터 길이를 다시 확인해주세요",
      });
      return;
    }
    const id = solutionsData.projects[solutionsData.projects.length - 1].id;
    solutionsData.totalNumberProjects += 1;
    solutionsData.projects.push({
      id: id + 1,
      projectName: projectName,
      description: description,
      participants: participants,
      progress: progress,
    });
    res.json({
      id: id + 1,
      message: "등록 완료",
    });
  } else {
    res.status(400).json({
      message: "필수값이 누락되었습니다.",
    });
  }
});

app.put("/members/:id", (req, res) => {
  if (Object.keys(req.body).length != 0 && req.body.name && req.body.teamName) {
    const id = req.params.id;
    const name = req.body.name;
    const teamName = req.body.teamName;
    const phoneNumber = req.body.phoneNumber;
    if (!membersValidation(name, teamName, phoneNumber, "PUT")) {
      res.status(400).json({
        message: "요청 타입 또는 파라미터 길이를 다시 확인해주세요",
      });
      return;
    }

    membersData.companyMember.forEach((el) => {
      if (String(el.identificationNumber) === id) {
        el.name = name;
        el.teamName = teamName;
        if (phoneNumber != undefined) {
          el.phoneNumber = phoneNumber;
        }
      }
    });
    res.json({
      identificationNumber: id,
      message: "수정 완료",
    });
  } else {
    res.status(400).json({
      message: "필수값이 누락되었습니다",
    });
  }
});

app.put("/solutions/:id", (req, res) => {
  if (Object.keys(req.body).length != 0) {
    const resData = { message: "수정완료" };
    const id = req.params.id;
    const projectName = req.body.projectName;
    const description = req.body.description;
    const participants = req.body.participants;
    const progress = req.body.progress;
    const generateResData = (str, data, el) => {
      if (data != undefined) {
        el[str] = data;
        resData[str] = data;
      }
    };
    if (
      !solutionsValidation(
        projectName,
        description,
        participants,
        progress,
        "PUT"
      )
    ) {
      res.status(400).json({
        message: "요청 타입 또는 파라미터 길이를 다시 확인해주세요",
      });
      return;
    }
    solutionsData.projects.forEach((el) => {
      if (String(el.id) === id) {
        generateResData("projectName", projectName, el);
        generateResData("description", description, el);
        generateResData("participants", participants, el);
        generateResData("progress", progress, el);
      }
    });
    res.json(resData);
  } else {
    res.status(400).json({
      message: "필수값이 누락되었습니다.",
    });
  }
});

app.delete("/members/:id", (req, res) => {
  const id = req.params.id;
  const membersLength = membersData.companyMember.length;
  membersData.companyMember = membersData.companyMember.filter(
    (el) => String(el.identificationNumber) != id
  );

  if (membersData.companyMember.length === membersLength) {
    res.status(400).json({
      message: "해당 직원은 존재하지 않습니다.",
    });
  } else {
    res.json({
      identificationNumber: id,
      message: "삭제 완료",
    });
  }
});

app.delete("/solutions/:id", (req, res) => {
  const id = req.params.id;
  let projectName;

  solutionsData.projects = solutionsData.projects.filter((el) => {
    if (String(el.id) === id) {
      projectName = el.projectName;
    }
    return String(el.id) != id;
  });

  if (projectName) {
    res.json({
      projectName: projectName,
      message: "삭제 완료",
    });
  } else {
    res.status(400).json({
      message: "해당 솔루션은 존재하지 않습니다.",
    });
  }
});
// 추후 서버 에러 발생 시 추가

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   const status = err.status || 500;
//   const message =
//     status === 500 ? "서버에서 에러가 발생했습니다!" : err.message;
//   res.status(status).json({ message });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
