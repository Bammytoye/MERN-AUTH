function About() {
    return (
        <div className="min-h-screen py-10">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
                {/* Section Title */}
                <div className="mb-12">
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 text-justify">
                        Empowering developers and businesses, this authentication system leverages the MERN stack 
                        (MongoDB, Express, React, and Node.js) to deliver secure, scalable, and efficient user 
                        management solutions. It simplifies essential tasks like registration, login, password 
                        recovery, and role-based access control while ensuring robust security with JWT authentication 
                        and encryption. Ideal for projects of all sizes, it ensures seamless integration and performance.
                    </p>
                </div>

                {/* Mission Section */}
                <section className="mb-16">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">Our Mission</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed text-justify">
                        At MERN Authentication, our mission is to simplify the process of securing modern web 
                        applications. We provide a comprehensive authentication solution that is not only easy to 
                        integrate but also robust, scalable, and designed to meet the diverse needs of developers 
                        and organizations. Whether you’re creating a small application or managing an 
                        enterprise-level project, our platform ensures seamless user management with cutting-edge 
                        security practices.
                    </p>
                </section>

                {/* Why Choose Us Section */}
                <section className="mb-16">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">Why Choose MERN Authentication?</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                        MERN Authentication stands out as the go-to solution for modern web applications because 
                        of its flexibility, security, and performance. By leveraging the power of MongoDB, Express, 
                        React, and Node.js, we deliver a system that is:
                    </p>
                    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-2">Secure</h3>
                            <p className="text-gray-700">
                                We prioritize user security with features like password hashing, token encryption, 
                                and role-based access control.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-2">Scalable</h3>
                            <p className="text-gray-700">
                                Whether you’re running a startup or an enterprise, our system grows with your 
                                application, ensuring reliable performance at every stage.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-2">Developer-Friendly</h3>
                            <p className="text-gray-700">
                                With intuitive APIs and detailed documentation, we make it easy for developers to 
                                integrate and customize our solution.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-2">Flexible</h3>
                            <p className="text-gray-700">
                                Built on the MERN stack, this system integrates effortlessly with your existing 
                                projects, saving time and effort.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="text-center">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">Get Started Today</h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                        Join thousands of developers and organizations who trust MERN Authentication for 
                        secure and scalable user management. Whether you&#39;re building from scratch or 
                        integrating into an existing project, our solution is designed to make your life easier.
                    </p>
                    <div className="space-x-4">
                        <a
                            href="/register"
                            className="bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded shadow hover:bg-gray-900"
                        >
                            Get Started
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default About;
