document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const startDate = document.getElementById('start_date').value;
    const endDate = document.getElementById('end_date').value;

    try {
        // Отправляем POST-запрос для авторизации
        const response = await fetch('https://store-demo-test.ru/_admin_login_', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, password })
        });

        if (!response.ok) {
            throw new Error('Ошибка авторизации');
        }

        const result = await response.json();
        const token = result.access_token;  // Извлекаем токен из ответа
        console.log('Получен токен:', token);

        if (!token) {
            throw new Error('Токен не получен или не найден в ответе сервера');
        }

        // Отправляем GET-запрос для получения данных о выручке
        const revenueResponse = await fetch(`https://store-demo-test.ru/_get_finance_plan_?start_date=${startDate}&end_date=${endDate}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`  // Используем правильный токен
            }
        });

        if (!revenueResponse.ok) {
            throw new Error(`Ошибка: ${revenueResponse.status}`);
        }

        const revenueData = await revenueResponse.json();
        console.log('Полученные данные от сервера:', revenueData);

        // Извлекаем данные для построения графика
        const data = revenueData.finance_planfact;

        if (!Array.isArray(data)) {
            console.error('Ожидался массив данных finance_planfact, но получен другой тип:', data);
            return;
        }

        // Собираем даты и значения выручки
        const labels = data.map(item => item.data);
        const values = data.map(item => item.revenue);
        console.log('Массив дат:', labels);  // Проверь даты
        console.log('Массив выручки:', values);  // Проверь значения выручки
        displayChart({ labels, values }); // Передаем данные для построения графика

    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
});

// Функция для отображения гистограммы
function displayChart({ labels, values }) {
    // Очищаем контейнер для графика перед созданием нового
    document.getElementById('chartContainer').innerHTML = '';
    const ctx = document.createElement('canvas');
    document.getElementById('chartContainer').appendChild(ctx);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Выручка',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'Дата' } },
                y: { title: { display: true, text: 'Выручка' } }
            }
        }
    });
}
