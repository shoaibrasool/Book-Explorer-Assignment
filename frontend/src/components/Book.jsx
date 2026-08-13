import './Book.css';

export const Book = ({ book }) => {
    const { title, authors, firstPublishYear, coverImage, averageRating } = book;

    return (
        <div className="card">
            <img src={coverImage} alt={title} className="cover" />

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
                        <span>{'\u2B50'} {averageRating}/5</span>
                    ) : (
                        'No rating'
                    )}
                </p>
            </div>
        </div>
    );
};