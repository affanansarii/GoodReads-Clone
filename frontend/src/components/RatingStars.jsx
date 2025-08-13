export default function RatingStars({ value = 0, onChange }) {
    return (
        <div>
            {[1, 2, 3, 4, 5].map((n) => (
                <button
                    key={n}
                    type="button"
                    className={`btn btn-sm ${
                        n <= value ? "btn-warning" : "btn-outline-secondary"
                    } me-1`}
                    onClick={() => onChange?.(n)}
                    aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
                >
                    ★
                </button>
            ))}
        </div>
    );
}
