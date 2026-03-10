const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const statusText = document.getElementById("status");

searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const recipeTitle = searchInput.value.trim();

    if (!recipeTitle) {
        statusText.textContent = "გთხოვ ჩაწერო კერძის სახელი ინგლისურად";
        results.innerHTML = "";
        return;
    }

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeTitle}`;

    results.innerHTML = "";
    statusText.textContent = "იტვირტება...";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.meals) {
            statusText.textContent = "რეცეპტი ვერ მოიძებნა";
            return;
        }

        statusText.textContent = `ნაპოვნია ${data.meals.length} რეცეპტი`;

        data.meals.forEach((recipe) => {
            const div = document.createElement("div");

            div.innerHTML = `
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" width="250">
                <p><strong>${recipe.strMeal}</strong></p>
                <p>კატეგორია: ${recipe.strCategory}</p>
                <p>ქვეყანა: ${recipe.strArea}</p>
                <p>ინსტრუქცია: ${recipe.strInstructions.slice(0, 150)}...</p>
            `;

            results.appendChild(div);
        });
    } catch (error) {
        statusText.textContent = "დაფიქსირდა შეცდომა";
        console.error(error.message);
    }
});