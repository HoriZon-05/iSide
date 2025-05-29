const div = document.querySelector('div');
const table = document.querySelector('.main');
const MAINtr = document.querySelectorAll('.main tr');
const course  = document.querySelectorAll('.course input');
const personNum = document.querySelectorAll('.num');
const checkBox = document.querySelectorAll('table input[type="checkbox"]');
const text = document.querySelectorAll('table input[type="text"]');
const search = document.querySelector('.search');
const startSearch = document.querySelector('.startSearch');
const resultTable = document.querySelector('.searchResult table');
const searchResult = document.querySelector('.searchResult');
const close =  document.querySelector('.searchResult button');
const add  = document.querySelector('.add');
const addPanel = document.querySelector('.addPanel');
const addInfo  = document.querySelectorAll('.addPanel input');
const confirm = document.querySelector('.addPanel .confirm');
const cancel = document.querySelector('.addPanel .cancel');
const one =document.querySelector('.one');
const edit = document.querySelectorAll('.edit');

add.addEventListener('click', function () {
    addPanel.classList.toggle('active');
});

update();

confirm.addEventListener('click', function () {
    addPanel.classList.toggle('active');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML += `
        <tr>
            <td>${tbody.rows.length}</td>
            <td><input type="text" value="${addInfo[0].value}" disabled></td>
            <td><input type="text" value="${addInfo[1].value}" disabled></td>
            <td class="course"><input type="text" value="${addInfo[2].value}" disabled></td>
            <td class="num">${addInfo[3].value}</td>
            <td>
                <input type="checkbox">
                    <svg width="40" height="40">
                    <circle fill="none" stroke="#68E534" stroke-width="2" cx="20" cy="20" r="19" class="circle" stroke-linecap="round" transform="rotate(-90 20.0 20.0) "/>
                    <polyline fill="none" stroke="#68E534" stroke-width="2.4" points="8.8,21.4 17.3,28.4 30.4,13.8" stroke-linecap="round" stroke-linejoin="round" class="tick" />
                    </svg>
            </td>
            <td><button class="long edit">编辑</button></td>
        </tr>
    `;
    update();
    for(let i = 0; i < addInfo.length; i++){
        addInfo[i].value = '';
    }
});
cancel.addEventListener('click', function () {
    addPanel.classList.toggle('active');
});
function update() { 
    const course  = document.querySelectorAll('.course input');
    const personNum = document.querySelectorAll('.num');
    const checkBox = document.querySelectorAll('table input[type="checkbox"]');
    const text = document.querySelectorAll('table input[type="text"]');
    const edit = document.querySelectorAll('.edit');
    for (let i = 0; i < checkBox.length; i++) {
    if(course[i].value!= "自习") {
        checkBox[i].disabled = true;
        checkBox[i].style.cursor = 'not-allowed';
    } else{
        checkBox[i].style.cursor = 'pointer';
    }
    checkBox[i].addEventListener('click', function () {
        if (this.checked) {
            setTimeout(function () {
                    personNum[i].textContent=+personNum[i].textContent+1;
                }, 1000);
            }else{
                personNum[i].textContent=+personNum[i].textContent-1;
            }
        })
    }

    for(let i=0;i<text.length;i++){
        text[i].disabled = true;
    }
    for(let i=0;i<edit.length;i++){
        edit[i].addEventListener('click', () => {
            for(let j=i*3;j<(i+1)*3;j++){
                text[j].disabled = !text[j].disabled;
            }
            edit[i].textContent = edit[i].textContent === '编辑' ? '完成' : '编辑';
        });
    }

}

search.addEventListener('input', () => { 
    startSearch.addEventListener('mouseenter', () => { 
            search.classList.add('active'); 
    });
    startSearch.addEventListener('click', () => { 
            searchResult.classList.add('active');
    });
    resultTable.innerHTML = `
        <tr>
            <th>序号</th>
            <th>教学楼</th>
            <th>教室名称</th>
            <th>课程</th>
            <th>教室当前人数</th>
            <th>申请自习</th>
            <th>操作</th>                  
        </tr>
    `;
        for(let i=1;i<=edit.length;i++){
                const hasMatch = Array.from(MAINtr[i].children).some(child => 
                    child.textContent.trim().includes(search.value.trim())
                );
                
                if(hasMatch){
                    resultTable.appendChild(MAINtr[i].cloneNode(true));
                    update();
                }
            }
    });

close.addEventListener('click', () => { 
    searchResult.classList.toggle('active');
    resultTable.innerHTML = '';
    search.value = '';
    search.classList.remove('active');
});