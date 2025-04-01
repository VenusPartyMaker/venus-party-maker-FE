
let bufferCount = 0, dealerCount = 0;

// character 객체
class Character {
    constructor(ownedName, characterName, isBuffer, power) {
        this.ownedName = ownedName;
        this.characterName = characterName;
        this.isBuffer = isBuffer;
        this.power = power;
    }
}

// 카운트 업데이트 함수
const updateCount = () => {
    const buffer = document.querySelector(".buffer");
    const dealer = document.querySelector(".dealer");

    buffer.textContent = bufferCount;
    dealer.textContent = dealerCount;
}

// 버퍼 판별 함수
const isBuffer = (str) => {
    return str === "버퍼" ? 1 : 0;
}

const postCharactorSet = async (characterSet) => {
    try {
        const response = await fetch("http://3.38.183.110:8080/api/v1/party/create", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(characterSet)
        });

        if (!response.ok) {
            throw new Error("서버 응답 실패");
        }
        const data = await response.json();
        console.log("서버 응답:", data);
        return data;
    } catch (error) {
        console.error("에러 발생:", error);
        return null;
    }
}
    
document.addEventListener("DOMContentLoaded", () => {
    const input_page = document.querySelector(".input");
    const output_page = document.querySelector(".output");
    const person_list = document.querySelector(".person_list");
    const party_list = document.querySelector(".party_list");
    const add_person_btn = document.querySelector(".add_person_btn");
    const make_party_btn = document.querySelector(".make_party_btn");
    const back_btn = document.querySelector(".back_btn");

    // person 추가 이벤트
    add_person_btn.addEventListener("click", (e) => {
        e.preventDefault();

        let person = document.createElement("li");
        let personName = prompt("이름을 입력해 주세요.");

        if (personName) {
            person.textContent = personName;
            person.className = personName; /* todo : className 금지어 지정, 중복 체크 */
            person_list.appendChild(person);

            // character 추가 버튼 생성
            let addCharacterBtn = document.createElement("button");
            addCharacterBtn.textContent = "+";
            person.appendChild(addCharacterBtn);

            // character 추가 이벤트
            addCharacterBtn.addEventListener("click", async (e) => {
                e.preventDefault();

                let character = document.createElement("span");
                let info = prompt("[캐릭터명] [버퍼/딜러] [버프력/전투력]을 입력해 주세요.").split(' ');

                if (info) {
                    if (info.length === 3 && info[1] === "버퍼" || info[1] === "딜러" && !isNaN(info[2])) {
                        character.textContent = `${info[0]} ${info[2]}`;
                        character.id = `${info[0]}_${isBuffer(info[1])}_${info[2]}`;
                        if (info[1] === "버퍼") {
                            character.style.backgroundColor = "pink";
                            bufferCount++;
                        }
                        else {
                            character.style.backgroundColor = "skyblue";
                            dealerCount++;
                        }
                        person.insertBefore(character, addCharacterBtn);
                        updateCount();

                        // character 삭제 이벤트
                        character.addEventListener("click", (e) => {
                            character.style.backgroundColor === "pink" ? bufferCount-- : dealerCount--;
                            updateCount();
                            character.remove();
                        })
                    }
                    else {
                        alert("양식이 잘못되었습니다.");
                    }
                }
            })

            // person 삭제 버튼 생성
            let removeBtn = document.createElement("button");
            removeBtn.textContent = "삭제";
            person.appendChild(removeBtn);

            // person 삭제 이벤트
            removeBtn.addEventListener("click", (e) => {
                person.querySelectorAll("span").forEach(character => {
                    character.style.backgroundColor === "pink" ? bufferCount-- : dealerCount--;
                });
                updateCount();
                person.remove();
            })
        }
    })

    // 파티 생성 이벤트
    make_party_btn.addEventListener("click", async (e) => {
        e.preventDefault();

        let totalCount = bufferCount + dealerCount;

        /* todo : 한 사람이 가지고 있는 캐릭터의 개수가 파티의 개수보다 많을 때 파티 생성 안되게 수정 */
        if (totalCount && totalCount % 4 === 0) {
            if (dealerCount / bufferCount === 3) {
                let characterList = [];
                person_list.querySelectorAll("span").forEach(character => {
                    characterList.push(new Character(
                        character.parentElement.className,
                        character.id.split("_")[0],
                        parseInt(character.id.split("_")[1]),
                        character.id.split("_")[2]
                    ))
                });
                const partyList = await postCharactorSet(characterList);

                partyList.forEach((partySet, i) => {
                    let party = document.createElement("li");
                    let partyPower = document.createElement("span");

                    party.textContent = `${i+1}번째 파티`;
                    partyPower.textContent = `${partySet.totalPower}%`;
                    party_list.appendChild(party);
                    party.appendChild(partyPower);

                    partySet.characters.forEach(character => {
                        let char = document.createElement("span");
                        char.textContent = `[${character.ownedName}] ${character.characterName}`
                        if (character.isBuffer) {
                            char.style.backgroundColor = "pink";
                        }
                        else {
                            char.style.backgroundColor = "skyblue";
                        }
                        party.insertBefore(char, partyPower);
                    })
                })

                input_page.className = "input none";
                output_page.className = "output";
            }
            else {
                alert("버퍼와 딜러의 비율이 맞지 않습니다.");
            }
        }
        else {
            alert("1개의 파티를 만들 캐릭터가 부족합니다.");
        }
    })

    // 돌아가기 이벤트
    back_btn.addEventListener("click", (e) => {
        e.preventDefault();

        party_list.innerHTML = "";
        input_page.className = "input";
        output_page.className = "output none";
    })
})