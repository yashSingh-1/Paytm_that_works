interface Props {
    message?: string;
}

const ErrorMessage = ({message}: Props) => {
    return <div className="w-[300px] bg-red-500 p-2">
        <div className="text-red-900 font-mono">
            {message}
        </div>
    </div>
}

export default ErrorMessage;