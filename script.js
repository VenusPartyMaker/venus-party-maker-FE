let bufferCount = 0,
    dealerCount = 0;

// character 객체
class Character {
    constructor(ownedName, characterName, isBuffer, powers) {
        this.ownedName = ownedName;
        this.characterName = characterName;
        this.isBuffer = isBuffer;
        this.powers = powers;
    }
}

// 카운트 업데이트 함수
const updateCount = () => {
    const buffer = document.querySelector(".buffer");
    const dealer = document.querySelector(".dealer");

    buffer.textContent = bufferCount;
    dealer.textContent = dealerCount;
};

// 버퍼 판별 함수
const isBuffer = (jobName) =>
    ["크루세이더", "인챈트리스", "뮤즈", "패러메딕"].includes(jobName);

// 서버 변환 함수
const convertServerName = (keyword1) => {
    switch (keyword1) {
        case "안톤":
            return "anton";
        case "바칼":
            return "bakal";
        case "카인":
            return "cain";
        case "카시야스":
            return "casillas";
        case "디레지에":
            return "diregie";
        case "힐더":
            return "hilder";
        case "프레이":
            return "prey";
        case "시로코":
            return "siroco";
        default:
            return false;
    }
};

const getCharacter = async (server, name) => {
    try {
        const response = await fetch(
            `http://3.38.183.110:8080/api/v1/party/getCharacter?serverId=${server}&characterName=${name}`
        );

        if (!response.ok) {
            throw new Error("서버 응답 실패");
        }
        const data = await response.json();
        console.log("data:", data);
        return data;
    } catch (error) {
        alert("존재하지 않는 캐릭터이거나, 에러가 발생했습니다.");
        console.error("에러 발생:", error);
        return null;
    }
};

const postCharacterSet = async (characterSet) => {
    try {
        const response = await fetch(
            "http://3.36.58.16:8080/api/v1/party/create",
            {
                method: "POST",
                headers: { "Content-Type": "application/json; charset=UTF-8" },
                body: JSON.stringify(characterSet),
            }
        );

        if (!response.ok) {
            throw new Error("서버 응답 실패");
        }
        const data = await response.json();
        console.log("data:", data);
        return data;
    } catch (error) {
        console.error("에러 발생:", error);
        return null;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const input_page = document.querySelector(".input");
    const output_page = document.querySelector(".output");
    const person_list = document.querySelector(".person_list ul");
    const party_list = document.querySelector(".party_list ul");
    const add_person_btn = document.querySelector(".add_person_btn");
    const make_party_btn = document.querySelector(".make_party_btn");
    const back_btn = document.querySelector(".back_btn");

    // person 추가 이벤트
    add_person_btn.addEventListener("click", (e) => {
        e.preventDefault();

        const person = document.createElement("li");
        let personName = prompt("이름을 입력해 주세요.");

        if (personName) {
            person.textContent = personName;
            person.className = personName;
            person_list.appendChild(person);

            // character 추가 버튼 생성
            const add_character_btn = document.createElement("button");
            add_character_btn.textContent = "+";
            person.appendChild(add_character_btn);

            // character 추가 이벤트
            add_character_btn.addEventListener("click", async (e) => {
                e.preventDefault();

                const character = document.createElement("span");
                let keyword = prompt("[서버명] [캐릭터명]을 입력해 주세요.");

                if (keyword) {
                    keyword = keyword.split(" ");
                    if (keyword.length === 2) {
                        if (convertServerName(keyword[0])) {
                            let info = await getCharacter(
                                convertServerName(keyword[0]),
                                keyword[1]
                            );

                            character.id = `${person.className}_${
                                info.characterName
                            }_${isBuffer(info.jobName)}_${info.powers}`;
                            character.textContent = `${info.characterName} ${info.powers[0]}`;

                            if (isBuffer(info.jobName)) {
                                character.style.backgroundColor = "pink";
                                bufferCount++;
                            } else {
                                character.style.backgroundColor = "skyblue";
                                dealerCount++;
                            }
                            person.insertBefore(character, add_character_btn);
                            updateCount();

                            // character 삭제 이벤트
                            character.addEventListener("click", () => {
                                isBuffer(info.jobName)
                                    ? bufferCount--
                                    : dealerCount--;
                                updateCount();
                                character.remove();
                            });
                        } else {
                            alert("서버명을 잘못 입력했습니다.");
                        }
                    } else {
                        alert("양식이 잘못되었습니다.");
                    }
                }
            });

            // person 삭제 버튼 생성
            const delete_person_btn = document.createElement("button");
            delete_person_btn.textContent = "삭제";
            person.appendChild(delete_person_btn);

            // person 삭제 이벤트
            delete_person_btn.addEventListener("click", (e) => {
                person.querySelectorAll("span").forEach((character) => {
                    character.style.backgroundColor === "pink"
                        ? bufferCount--
                        : dealerCount--;
                });
                updateCount();
                person.remove();
            });
        }
    });

    // 파티 생성 이벤트
    make_party_btn.addEventListener("click", async (e) => {
        e.preventDefault();

        let totalCount = bufferCount + dealerCount;

        /* todo : 한 사람이 가지고 있는 캐릭터의 개수가 파티의 개수보다 많을 때 파티 생성 안되게 수정 */
        if (totalCount && totalCount % 4 === 0) {
            if (dealerCount / bufferCount === 3) {
                let characterList = [];
                person_list.querySelectorAll("span").forEach((character) => {
                    characterList.push(
                        new Character(
                            character.id.split("_")[0],
                            character.id.split("_")[1],
                            character.id.split("_")[2],
                            character.id.split("_")[3].split(",")
                        )
                    );
                });
                const partyList = await postCharacterSet(characterList);

                partyList.forEach((partySet, i) => {
                    let party = document.createElement("li");
                    let partyPower = document.createElement("span");

                    party.textContent = `${i + 1}번째 파티`;
                    partyPower.textContent = `${partySet.totalPower}%`;
                    party_list.appendChild(party);
                    party.appendChild(partyPower);

                    partySet.characters.forEach((character) => {
                        let char = document.createElement("span");
                        char.textContent = `[${character.ownedName}] ${character.characterName}`;
                        if (character.isBuffer) {
                            char.style.backgroundColor = "pink";
                        } else {
                            char.style.backgroundColor = "skyblue";
                        }
                        party.insertBefore(char, partyPower);
                    });
                });

                input_page.className = "input none";
                output_page.className = "output";
            } else {
                alert("버퍼와 딜러의 비율이 맞지 않습니다.");
            }
        } else {
            alert("1개의 파티를 만들 캐릭터가 부족합니다.");
        }
    });

    // 돌아가기 이벤트
    back_btn.addEventListener("click", (e) => {
        e.preventDefault();

        party_list.innerHTML = "";
        input_page.className = "input";
        output_page.className = "output none";
    });
});
