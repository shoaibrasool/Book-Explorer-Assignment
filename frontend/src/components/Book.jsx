import './Book.css';

const renderStars = (rating) => {
    const filledStars = Math.round(rating);
    const emptyStars = 5 - filledStars;
    return '★'.repeat(filledStars) + '☆'.repeat(emptyStars);
};

export const Book = ({ book }) => {
    const { title, authors, firstPublishYear, coverImage, averageRating } = book;

    return (
        <div className="card">
            {coverImage ? (
                <img src={coverImage} alt={title} className="cover" />
            ) : (
                <div className="coverPlaceholder">{title}</div>
            )}

            <div className="content">
                <h3 className="title">{title}</h3>

                <p className="text">
                    <strong>Author:</strong> {authors ? authors.join(', ') : 'Unknown'}
                </p>

                <p className="subtext">
                    Published: {firstPublishYear || 'N/A'}
                </p>

                <p className="rating">
                    {averageRating ? (
                        <>
                            <span className="stars">{renderStars(averageRating)}</span>
                            <span className="ratingValue">{averageRating.toFixed(1)} / 5</span>
                        </>
                    ) : (
                        'No rating'
                    )}
                </p>
            </div>
        </div>
    );
};