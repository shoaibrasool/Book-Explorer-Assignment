import './SkeletonCard.css';

export const SkeletonCard = () => {
    return (
        <div className="skeletonCard">
            <div className="skeletonCover"></div>
            <div className="skeletonContent">
                <div className="skeletonLine skeletonTitle"></div>
                <div className="skeletonLine"></div>
                <div className="skeletonLine skeletonShort"></div>
            </div>
        </div>
    );
};