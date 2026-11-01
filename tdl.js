let task = document.getElementById('task');
let btnadd = document.getElementById('btnadd');
let tasklist = document.getElementById('tasklist');
let taskcounter = document.getElementById('taskcounter');
let btndeleteall = document.getElementById('btndeleteall');

// دالة الحفظ الاحترافية (تخزن النص والحالة كـ Object)
function savetask() {
    let taskarray = [];
    let all_list = document.querySelectorAll('#tasklist li');
    
    all_list.forEach(function(li) {
        let tasktext = li.firstChild.textContent;
        taskarray.push({
            text: tasktext,
            completed: li.classList.contains('checked')
        });
    });
    
    localStorage.setItem('mytask', JSON.stringify(taskarray));
}

// دالة ذكية تصنع عنصر المهمة وتجهزه بكل أزراره وحركاته لمنع تكرار الكود
function createWithLogic(text, isCompleted) {
    let newil = document.createElement('li');
    newil.innerText = text;
    
    // إذا كانت المهمة مكتملة من قبل، نضيف الكلاس فوراً
    if (isCompleted) {
        newil.classList.add('checked');
    }

    // صناعة زر الحذف
    let deletebtn = document.createElement('button');
    deletebtn.innerText = 'X';
    deletebtn.style.color = 'rgb(55, 27, 36)'
    
    deletebtn.addEventListener('click', function(e) {
        e.stopPropagation(); // منع التداخل مع كبسة التشطيب
        newil.remove();
        savetask();
        updatecounter();
    });

    // الاستماع لنقرة التشطيب على كرت المهمة نفسه
    newil.addEventListener('click', function() {
        newil.classList.toggle('checked');
        savetask();
        updatecounter();
    });

    newil.appendChild(deletebtn);
    tasklist.appendChild(newil);
}

// برمجة زر الإضافة الأساسي
btnadd.addEventListener('click', function() {
    let text = task.value.trim();
    if (text === '') return; // منع إضافة مهام فارغة

    createWithLogic(text, false); // نصنع المهمة وحالتها الافتراضية غير مكتملة
    savetask();
    task.value = '';
    updatecounter()
    btndeleteall.style.display ='block';
    
});

// دالة الاسترجاع عند فتح الصفحة
function loadtask() {
    let savedtask = JSON.parse(localStorage.getItem('mytask'));
    if (savedtask !== null) {
        savedtask.forEach(function(taskobj) {
            createWithLogic(taskobj.text, taskobj.completed);
        });
        updatecounter();
    }
}

// تشغيل دالة الاسترجاع فوراً عند فتح الصفحة
loadtask();

function updatecounter(){
    let activetask = document.querySelectorAll('#tasklist li:not(.checked)').length;
    taskcounter.innerText = activetask;
}

// زر حذف الكل المهام
    btndeleteall.addEventListener('click',function(){
   tasklist.innerHTML = '';
   savetask();
   updatecounter();
   btndeleteall.style.display= 'none';
})







