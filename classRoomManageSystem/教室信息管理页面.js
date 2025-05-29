const div = document.querySelector('div');
const table = document.querySelector('.main');
const MAINtr = document.querySelectorAll('.main tr');
const course  = document.querySelectorAll('.main .course input');
const personNum = document.querySelectorAll('.main .num');
const checkBox = document.querySelectorAll('.main input[type="checkbox"]');
const text = document.querySelectorAll('.main input[type="text"]');
const edit = document.querySelectorAll('.main .edit');

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

update();

add.addEventListener('click', function () {
    addPanel.classList.toggle('active');
});

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
    MAINtr = document.querySelectorAll('.main tr'); // 重新获取所有行   
    for(let i = 0; i < addInfo.length; i++){
        addInfo[i].value = '';
    }
});
cancel.addEventListener('click', function () {
    addPanel.classList.toggle('active');
});

search.addEventListener('input', () => { 
    startSearch.addEventListener('mouseenter', () => { 
        search.classList.add('active'); 
    });

    startSearch.addEventListener('click', () => { 
        searchResult.classList.add('active');
        performSearch();
    });

    search.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            searchResult.classList.add('active');
            performSearch();
        }
    });

    // 封装搜索逻辑为单独函数
    function performSearch() {
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
        
        if(search.value.trim() === "") {
            resultTable.innerHTML="无搜索结果";
            return;
        }

        // 重新获取所有行，确保包含新增元素
        const currentRows = document.querySelectorAll('.main tr');
        
        currentRows.forEach((row, index) => {
            if(index === 0) return; // 跳过表头
            
            const hasMatch = Array.from(row.children).some(child => {
                const input = child.querySelector('input');
                if (input) {
                    return input.value.trim().includes(search.value.trim());
                }
                return child.textContent.trim().includes(search.value.trim());
            });
            
        if(hasMatch){
            const clonedRow = row.cloneNode(true);
            resultTable.appendChild(clonedRow);
            
            // 1. 克隆行 → 原行的同步
            clonedRow.addEventListener('click', (e) => {
                if(e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
                    const originalElement = row.querySelector(`[name="${e.target.name}"]`) || row.querySelector(`.${e.target.className.split(' ')[0]}`);
                    
                    if(originalElement) {
                        if(e.target.type === 'checkbox') {
                            originalElement.checked = e.target.checked;
                        } 
                        else if(e.target.tagName === 'INPUT') {
                            originalElement.value = e.target.value;
                        }
                        else if(e.target.classList.contains('edit')) {
                            originalElement.click();
                        }
                        else{
                            originalElement.value = e.target.value;
                        }
                        update();
                    }
                }
            });

            // 2. 原行 → 克隆行的同步
            row.addEventListener('change', (e) => {
                if(e.target.tagName === 'INPUT') {
                    const clonedElement = clonedRow.querySelector(`[name="${e.target.name}"]`) || clonedRow.querySelector(`.${e.target.className.split(' ')[0]}`);
                    
                    if(clonedElement) {
                        if(e.target.type === 'checkbox') {
                            clonedElement.checked = e.target.checked;
                        } 
                        else if(e.target.type === 'INPUT') {
                            clonedElement.value = e.target.value;
                        }
                        else if(e.target.classList.contains('edit')) {
                            originalElement.click();
                        }
                        else {
                            clonedElement.value = e.target.value;
                        }
                        update();
                    }
                }
            });
            } 
        });
    }
});
close.addEventListener('click', () => { 
    search.classList.remove('active');
    search.value = '';
    setTimeout(() => {
        searchResult.classList.toggle('active'); 
    }, 50);
});