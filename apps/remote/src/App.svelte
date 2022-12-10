<script lang="ts">
  import './tailwind.css';

  interface IApp {
    id: string;
    slug: string;
    name: string;
    description: string;
    cover: {
      url: string;
      width: number;
      height: number;
    };
  }

  export let data: IApp | undefined = undefined;

  let deleting = false;

  const deleteApp = async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  };
</script>

<header class="py-4 px-6">
  <a
    href="http://localhost:3000"
    class="flex gap-2 items-center hover:text-sky-700 focus:text-sky-700 transition-colors duration-300 outline-none w-fit"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      class="w-4 h-4"
    >
      <path
        fill-rule="evenodd"
        d="M7.28 7.72a.75.75 0 010 1.06l-2.47 2.47H21a.75.75 0 010 1.5H4.81l2.47 2.47a.75.75 0 11-1.06 1.06l-3.75-3.75a.75.75 0 010-1.06l3.75-3.75a.75.75 0 011.06 0z"
        clip-rule="evenodd"
      />
    </svg>

    Go back
  </a>
</header>

{#if data}
  <main>
    <div class="max-w-[900px] mx-auto p-[4rem]">
      <div>
        <h1 class="font-serif text-4xl font-bold">{data.name}</h1>
        <p class="text-neutral-800">{data.description}</p>

        <div class="mt-4 w-fit flex overflow-hidden">
          <img
            class="max-w-full max-h-[400px]"
            src={data.cover.url}
            alt={data.name}
            draggable="false"
          />
        </div>

        <button
          class="bg-white border border-sky-300 mt-6 px-4 py-3 rounded-sm text-sky-500 hover:border-sky-400 hover:bg-sky-50 transition-all duration-300 outline-none focus:border-sky-400 focus:bg-sky-50 disabled:border-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed disabled:bg-white"
          disabled={deleting}
          on:click={async () => {
            try {
              deleting = true;
              await deleteApp();
              window.location.href = 'http://localhost:3000';
            } catch {
            } finally {
              deleting = false;
            }
          }}
        >
          {deleting ? 'Loading...' : 'Delete app'}
        </button>
      </div>
    </div>
  </main>
{/if}
