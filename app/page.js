import TodoFilter from "@/components/todo-filter";
import ToDoForm from "@/components/todo-form";
import TodoList from "@/components/todo-list";
import dbConnect from "@/lib/db";

export default async function Home() {
  await dbConnect();
  return (
    <div className=" min-h-screen bg-background">
      <div className=" container mx-auto px-4 py8 max-w-2xl">
        <header className=" text-center mb-8">
          <h1 className=" text-4xl font-bold text-foreground mb-2">ToDo App</h1>
          <p className=" text-muted-foreground">
            Built with Next.js , Zustand, TanStack Query, Zod & Mongoose.
          </p>
        </header>

        <main>
          <ToDoForm />
          <TodoFilter />
          <TodoList />
        </main>

        <footer className=" mt-12 text-center text-sm text-muted-foreground">
          <p>
            This app demonstrates CRUD operations with modern React patterns.
          </p>
        </footer>
      </div>
    </div>
  );
}
