document.addEventListener('DOMContentLoaded', function() {
    const reviewsContainer = document.getElementById('reviews-app');
    if (!reviewsContainer) return;

    const bookId = reviewsContainer.dataset.bookId;
    const csrfToken = reviewsContainer.dataset.csrf;
    const reviewsList = document.getElementById('reviewsList');
    const reviewText = document.getElementById('reviewText');
    const sendBtn = document.getElementById('sendReviewBtn');

    async function loadReviews() {
        try {
            const response = await fetch(`/books/${bookId}/get_reviews/`);
            if (!response.ok) throw new Error('Ошибка при загрузке');

            const data = await response.json();

            reviewsList.innerHTML = data.reviews.map(r => `
                <div class="card mb-2 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between">
                            <strong>${r.username}</strong>
                            <small class="text-muted">${r.date}</small>
                        </div>
                        <p class="mb-0 mt-2">${r.text}</p>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    async function sendReview() {
        const text = reviewText.value.trim();
        if (!text) return;

        sendBtn.disabled = true;

        try {
            const response = await fetch(`/books/${bookId}/add_review/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify({ text: text })
            });

            if (response.ok) {
                reviewText.value = '';
                await loadReviews();
            }
        } catch (error) {
            alert('Не удалось отправить отзыв');
        } finally {
            sendBtn.disabled = false;
        }
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', sendReview);
    }

    setInterval(loadReviews, 5000);

    loadReviews();
});