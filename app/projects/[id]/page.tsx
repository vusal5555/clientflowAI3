import React from "react";

const ProjectPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  console.log(id);

  return <div>ProjectPage</div>;
};

export default ProjectPage;
