function HomePage() {
    return (
        <section className="text-black py-4 px-16">
            <div className="container mx-auto">
                {/* Title Section */}
                <h2 className="md:text-4xl font-bold mb-4 text-center">Welcome to MERN Authentication</h2>
                <p className="text-lg mb-6 text-justify">
                MERN Authentication is a secure, reliable, and scalable solution tailored for modern web applications. 
                Built on the powerful MERN stack like MongoDB, Express, React, and Node.js. This system simplifies user 
                authentication while ensuring exceptional performance and robust security. The platform is designed to 
                handle essential authentication features like user registration, login, password recovery, and 
                token-based authentication using JSON Web Tokens (JWT). By leveraging JWT, the system enables seamless 
                and secure communication between the frontend and backend, ensuring that user sessions remain safe and 
                tamper-proof. Security is a priority with features such as password hashing using bcrypt, protecting 
                sensitive user data, and implementing encryption mechanisms. Additionally, role-based access control 
                (RBAC) allows developers to manage user permissions efficiently, ensuring users only access authorized 
                parts of the application. 
                The system is highly scalable and ideal for applications ranging from small projects to large-scale 
                enterprise solutions. It also includes session management, token expiration handling, and an easy 
                integration process with the MERN stack, making it a perfect choice for developers seeking simplicity 
                and flexibility. Whether you&#39;re building a startup project or scaling an enterprise-level application, 
                MERN Authentication empowers developers to implement secure, scalable, and high-performing 
                authentication systems with minimal effort. Backed by comprehensive documentation and a modular 
                design, it&#39;s the go-to solution for modern web application needs.
                </p>
                
                {/* Description */}
                <p className="text-lg mb-6 text-justify">
                This platform provides a seamless and easy-to-integrate authentication system designed to handle 
                user registration, login, password recovery, and token-based authentication using JSON Web Tokens 
                (JWT). It ensures secure and efficient user management, making it an ideal solution for various 
                projects. Whether you&#39;re building a startup application, scaling a complex enterprise system, 
                or developing an educational demo, this system adapts to your needs. With robust security measures 
                like password hashing and token validation, it simplifies the process of managing user authentication 
                while ensuring data safety. Designed for flexibility and scalability, it&#39;s the perfect choice 
                for modern web applications.
                </p>

                {/* Key Features Section */}
                <div className="space-y-1 mt-10 mb-10 text-justify">
                    <p className="text-xl font-medium text-start mb-2">Key Features:</p>
                    <ul className="list-disc pl-5 text-start text-lg">
                        <li>
                            <span className="font-semibold">Secure JWT Authentication:</span> Enables seamless 
                            token-based authentication for secure and efficient communication between the frontend 
                            and backend.
                        </li>
                        <li>
                            <span className="font-semibold">Role-based Access Control (RBAC):</span> Assigns 
                            specific roles to users (e.g., Admin, User) to control access to different parts of 
                            your application.
                        </li>
                        <li>
                            <span className="font-semibold">Integration with MERN Stack:</span> Built with 
                            MongoDB, Express, React, and Node.js, making it easy to integrate into MERN-based 
                            projects.
                        </li>
                        <li>
                            <span className="font-semibold">Session Management:</span> Automatically manages 
                            token expiration and session states to enhance user experience and application 
                            performance.
                        </li>
                        <li>
                            <span className="font-semibold">Encryption and Password Hashing:</span> Uses bcrypt to 
                            hash passwords and AES-based encryption to secure sensitive data.
                        </li>
                        <li>
                            <span className="font-semibold">Scalable Design:</span> Designed to scale horizontally 
                            and handle high traffic with ease, making it suitable for growing applications.
                        </li>
                        <li>
                            <span className="font-semibold">Developer-Friendly Documentation:</span> Comprehensive 
                            guides and examples make integration straightforward for developers of all experience 
                            levels.
                        </li>
                    </ul>
                </div>

                {/* Benefits Section */}
                <div className="space-y-6">
                    <p className="text-lg mb-6 text-justify">
                        By using this system, developers can focus on building the core functionality of their 
                        applications instead of worrying about implementing complex authentication systems. It 
                        offers out-of-the-box security, scalability, and flexibility that align with the best 
                        practices of modern web development.
                    </p>
                    <p className="text-lg mb-6 text-justify">
                        For example, password recovery ensures that users who lose access can reset their 
                        credentials securely. Role based access control ensures that only authorized personnel 
                        can access specific features or dashboards. Additionally, features like token expiration 
                        ensure that user sessions remain secure, even if tokens are compromised.
                    </p>
                </div>

                {/* Call-to-Action Section */}
                <p className="text-lg mb-6 text-justify">
                    Ready to secure your application and enhance user experience? Get started by checking out the 
                    detailed documentation or cloning the GitHub repository. Integrate this system into your project 
                    today and take advantage of its cutting-edge features!
                </p>

                {/* Action Buttons */}
                <div className="space-x-4 flex justify-center items-center">
                    <a href="/register" className="bg-gray-700 text-white px-6 py-3 rounded shadow hover:bg-gray-900">
                        Get Started
                    </a>
                </div>
            </div>
        </section>
    );
}

export default HomePage;
