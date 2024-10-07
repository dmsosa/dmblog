import { SiSpring } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";
import { FaReact } from "react-icons/fa";
import { FaBootstrap } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";

function TechStack() {
    return (
        <>
        <h1>Tech Stack</h1>
        <ul>
            <li><a href="https://docs.spring.io/spring-framework/reference/index.html"><SiSpring/> Spring</a></li>
            <li><a href="https://www.postgresql.org/docs/"><SiPostgresql/> PostgreSQL</a></li>
            <li><a href="https://react.dev/"> <FaReact/>React</a></li>
            <li><a href="https://getbootstrap.com/docs/4.1/getting-started/introduction/"> <FaBootstrap/>Bootstrap</a></li>
            <li><a href="https://www.typescriptlang.org/docs/"> <SiTypescript/> TypeScript</a></li>
        </ul>
        </>
    );
  }
  
  export default TechStack;