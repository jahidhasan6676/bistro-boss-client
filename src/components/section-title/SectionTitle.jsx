

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:w-4/12 mx-auto my-8 text-center">
            <p className="text-yellow-600">---{subHeading}---</p>
            <h2 className="text-3xl uppercase border-y-2 py-3">{heading}</h2>
        </div>
    );
};

export default SectionTitle;